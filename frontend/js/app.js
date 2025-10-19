const API_BASE_URL = 'http://localhost:8080/api';

class TeleHealthApp {
    constructor() {
        this.patients = [];
        this.currentPatient = null;
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    }

    async makeRequest(url, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async loadPatients() {
        try {
            this.patients = await this.makeRequest('/patients');
            this.renderPatientsTable();
        } catch (error) {
            this.showAlert('Failed to load patients', 'danger');
        }
    }

    async savePatient(patientData) {
        try {
            if (this.currentPatient) {
                await this.makeRequest(`/patients/${this.currentPatient.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(patientData)
                });
                this.showAlert('Patient updated successfully', 'success');
            } else {
                await this.makeRequest('/patients', {
                    method: 'POST',
                    body: JSON.stringify(patientData)
                });
                this.showAlert('Patient created successfully', 'success');
            }
            this.loadPatients();
            this.resetForm();
        } catch (error) {
            this.showAlert('Failed to save patient', 'danger');
        }
    }

    async deletePatient(id) {
        if (confirm('Are you sure you want to delete this patient?')) {
            try {
                await this.makeRequest(`/patients/${id}`, {
                    method: 'DELETE'
                });
                this.showAlert('Patient deleted successfully', 'success');
                this.loadPatients();
            } catch (error) {
                this.showAlert('Failed to delete patient', 'danger');
            }
        }
    }

    async searchPatients(searchTerm) {
        try {
            if (searchTerm.trim()) {
                this.patients = await this.makeRequest(`/patients/search?q=${encodeURIComponent(searchTerm)}`);
            } else {
                await this.loadPatients();
                return;
            }
            this.renderPatientsTable();
        } catch (error) {
            this.showAlert('Search failed', 'danger');
        }
    }

    editPatient(patient) {
        this.currentPatient = patient;
        document.getElementById('patientName').value = patient.name;
        document.getElementById('patientEmail').value = patient.email;
        document.getElementById('patientPhone').value = patient.phone;
        document.getElementById('patientAddress').value = patient.address;
        document.getElementById('medicalHistory').value = patient.medicalHistory || '';
        document.getElementById('currentMedications').value = patient.currentMedications || '';
        
        document.getElementById('formTitle').textContent = 'Update Patient';
        document.getElementById('submitBtn').textContent = 'Update Patient';
    }

    resetForm() {
        this.currentPatient = null;
        document.getElementById('patientForm').reset();
        document.getElementById('formTitle').textContent = 'Add New Patient';
        document.getElementById('submitBtn').textContent = 'Add Patient';
    }

    renderPatientsTable() {
        const tbody = document.getElementById('patientsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        this.patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.email}</td>
                <td>${patient.phone}</td>
                <td>${patient.address || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="app.editPatient(${JSON.stringify(patient).replace(/"/g, '&quot;')})">Edit</button>
                    ${this.isAdmin ? `<button class="btn btn-danger btn-sm" onclick="app.deletePatient('${patient.id}')">Delete</button>` : ''}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    async testConnection() {
        try {
            await this.makeRequest('/test/health');
            return true;
        } catch (error) {
            console.error('Backend connection failed:', error);
            return false;
        }
    }

    async login(username, password) {
        try {
            // Test connection first
            const connected = await this.testConnection();
            if (!connected) {
                this.showAlert('Cannot connect to server. Please check if backend is running.', 'danger');
                return;
            }

            const response = await this.makeRequest('/admin/login', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });
            
            if (response.success) {
                localStorage.setItem('isAdmin', 'true');
                this.isAdmin = true;
                window.location.href = 'admin-dashboard.html';
            } else {
                this.showAlert('Invalid credentials. Try: admin / admin123', 'danger');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showAlert('Login failed. Check console for details.', 'danger');
        }
    }

    logout() {
        localStorage.removeItem('isAdmin');
        this.isAdmin = false;
        window.location.href = 'index.html';
    }
}

const app = new TeleHealthApp();

// Test backend connection on page load
window.addEventListener('load', async () => {
    const connected = await app.testConnection();
    if (!connected) {
        app.showAlert('Warning: Cannot connect to backend server', 'danger');
    }
});