package com.api.project.hospitalmanagement.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.project.hospitalmanagement.entity.Information;
import com.api.project.hospitalmanagement.entity.Patient;
import com.api.project.hospitalmanagement.repository.InformationRepository;
import com.api.project.hospitalmanagement.repository.PatientRepository;

import exceptions.PatientNotFoundException;

@Service
public class PatientService {

	 @Autowired
	  private PatientRepository patientRepository;
	  
	  @Autowired
	  private InformationRepository informationRepository;
	  
	
	  
		
	  public Patient saveOrUpdate (Patient patient){
		  try{
		  
			  if(patient.getSystemIdNumber() != null){
		            Patient existingPatient = patientRepository.findBySystemIdNumber(patient.getSystemIdNumber());
//		            if(existingPatient !=null &&(!existingPatient.getPatientName().equals(username))){
//		                throw new ProjectNotFoundException("Project not found in your account");
//		            }else 
		            	if(existingPatient == null){
		                throw new PatientNotFoundException("Project with ID: '"+patient.getOfficialIdNumber()+"' cannot be updated because it doesn't exist");
		            }
		        }
		  
//		  User user = userRepository.findByUsername(username);
//	      project.setUser(user);
//	      project.setProjectLeader(user.getUsername());
//	      project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
		  
		  if(patient.getSystemIdNumber() == null){
			  Patient pat = new Patient();
			  
		  }
		 
		  
		  return patientRepository.save(patient);
		  }
		  catch (Exception e) {
			throw new PatientNotFoundException("Project ID "+ patient.getOfficialIdNumber()+ " already exists");
		}    
	  }





	  
	  public Patient findPatientByIdentifier(Long patientId){
		  
		  Patient patient =  patientRepository.findBySystemIdNumber(patientId);
		  if(patient == null){
			  throw new PatientNotFoundException("Project ID "+ patientId +" does not exist");
		  }
		 return patient; 
	  }
//	  
	 public Iterable<Patient> findAllPatients(){
		 return patientRepository.findAll();
	  }
//	 
	 public void deletePatientByIdentifier(Long patientId){
		 
		 patientRepository.delete(findPatientByIdentifier(patientId));
	  }


}
