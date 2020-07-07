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
		            Patient existingPatient = patientRepository.findByOfficialIdNumber(patient.getOfficialIdNumber());
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
			  pat.setPatientName(patient.getPatientName());
			  pat.setOfficialIdNumber(patient.getOfficialIdNumber());
			  pat.setBirthDate(patient.getBirthDate());
			  pat.setEmail(patient.getEmail());
			  pat.setMetaData(patient.getMetaData());
		  }
		  
//		  if(patient.getSystemIdNumber() != null){
//			  patient.setBac(informationRepository.findByPatientIdentifier(patient.getOfficialIdNumber()));
//		  }
		  
		  return patientRepository.save(patient);
		  }
		  catch (Exception e) {
			throw new PatientNotFoundException("Project ID "+ patient.getOfficialIdNumber()+ " already exists");
		}    
	  }
	  
//	  public Project findProjectByIdentifier(String projectId, String username){
//		  
//		  Project project =  projectRepository.findByProjectIdentifier(projectId.toUpperCase());
//		  if(project == null){
//			  throw new ProjectException("Project ID "+ projectId +" does not exist");
//		  }
//		  if(!project.getProjectLeader().equals(username)){
//			  throw new PatientNotFoundException("Project not found in your account");
//		  }
//		 return project; 
//	  }
//	  
//	 public Iterable<Project> findAllProjects(String username){
//		 return projectRepository.findAllByProjectLeader(username);
//	  }
//	 
//	 public void deleteProjectByIdentifier(String projectId, String username){
//		 
//		  projectRepository.delete(findProjectByIdentifier(projectId, username));
//	  }
}
