package com.telehealth.service;

import com.telehealth.entity.Patient;
import com.telehealth.exception.PatientNotFoundException;
import com.telehealth.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PatientService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    
    public Patient getPatientById(String id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found with id: " + id));
    }
    
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }
    
    public Patient updatePatient(String id, Patient patient) {
        if (!patientRepository.existsById(id)) {
            throw new PatientNotFoundException("Patient not found with id: " + id);
        }
        patient.setId(id);
        return patientRepository.save(patient);
    }
    
    public void deletePatient(String id) {
        if (!patientRepository.existsById(id)) {
            throw new PatientNotFoundException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }
    
    public List<Patient> searchPatients(String searchTerm) {
        return patientRepository.findByNameOrEmailContainingIgnoreCase(searchTerm);
    }
}