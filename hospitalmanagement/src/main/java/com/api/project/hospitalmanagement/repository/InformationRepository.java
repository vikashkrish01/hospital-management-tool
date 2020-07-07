package com.api.project.hospitalmanagement.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.project.hospitalmanagement.entity.Information;
import com.api.project.hospitalmanagement.entity.Patient;


@Repository
public interface InformationRepository extends CrudRepository<Information, Long>{
	
	Patient findByOfficialIdNumber(String patientId);

}
