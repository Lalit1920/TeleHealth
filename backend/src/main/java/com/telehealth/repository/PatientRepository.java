package com.telehealth.repository;

import com.telehealth.entity.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    @Query("{'$or': [{'name': {'$regex': ?0, '$options': 'i'}}, {'email': {'$regex': ?0, '$options': 'i'}}]}")
    List<Patient> findByNameOrEmailContainingIgnoreCase(String searchTerm);
}