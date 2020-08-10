package com.api.project.hospitalmanagement.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.project.hospitalmanagement.entity.Patient;

@Repository
public interface PatientRepository extends CrudRepository<Patient, Long>{
	
	Patient findBySystemIdNumber(Long patientId);

	@Override
    Iterable<Patient> findAll();
}
