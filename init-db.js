// MongoDB initialization script
// Run this in MongoDB shell or MongoDB Compass

use telehealth;

// Create admin user
db.admins.insertOne({
    username: "admin",
    password: "admin123",
    createdAt: new Date(),
    updatedAt: new Date()
});

// Create sample patients
db.patients.insertMany([
    {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1234567890",
        address: "123 Main St, City, State 12345",
        medicalHistory: "Hypertension, Diabetes Type 2",
        currentMedications: "Metformin 500mg, Lisinopril 10mg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1987654321",
        address: "456 Oak Ave, City, State 67890",
        medicalHistory: "Asthma, Allergies",
        currentMedications: "Albuterol inhaler, Claritin 10mg",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: "Bob Johnson",
        email: "bob.johnson@email.com",
        phone: "+1122334455",
        address: "789 Pine Rd, City, State 11111",
        medicalHistory: "High cholesterol",
        currentMedications: "Atorvastatin 20mg",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

console.log("Database initialized with sample data!");