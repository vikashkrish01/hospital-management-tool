package com.api.project.hospitalmanagement.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.project.hospitalmanagement.entity.Patient;
import com.api.project.hospitalmanagement.service.PatientService;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins="*", allowedHeaders="*")
public class PatientController {

  @Autowired	
  private PatientService patientService;
  
  @PostMapping("/createNewPatient")
  public ResponseEntity<?> createNewPatient(@Valid @RequestBody Patient patient, BindingResult bindingResult){
	  
	  if(bindingResult.hasErrors()){
		  Map<String,String> errorMap = new HashMap<>();
		  for(FieldError error: bindingResult.getFieldErrors()){
			  errorMap.put(error.getField(), error.getDefaultMessage());
		  }
		  return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
	  }
	   patientService.saveOrUpdate(patient);
	   return new ResponseEntity<Patient>(patient, HttpStatus.CREATED);
  }
  
//  @PutMapping("/updatePatient/{officialIdNumber}")
//  public ResponseEntity<?> updateProject(@PathVariable String officialIdNumber, @RequestBody Patient patient, Principal principal,
//		  BindingResult bindingResult){
//	  
//	  if(bindingResult.hasErrors()){
//		  Map<String,String> errorMap = new HashMap<>();
//		  for(FieldError error: bindingResult.getFieldErrors()){
//			  errorMap.put(error.getField(), error.getDefaultMessage());
//		  }
//		  return new ResponseEntity<Map<String,String>>(errorMap, HttpStatus.BAD_REQUEST);
//	  }
//	   Patient patientUpdate = patientService.findPatientByIdentifier(officialIdNumber, principal.getName());
//	   patientService.saveOrUpdate(patientUpdate, principal.getName());
//	   return new ResponseEntity<Patient>(patient, HttpStatus.CREATED);
//  }
//  
//  
//  
  @GetMapping("/getPatientById/{systemIdNumber}")
  public ResponseEntity<?> getPatientById(@PathVariable Long systemIdNumber, Principal principal){
	  
	  Patient patient = patientService.findPatientByIdentifier(systemIdNumber);
	  return new ResponseEntity<Patient>(patient, HttpStatus.OK);
  }
 
  @GetMapping("/getPatients")
  public ResponseEntity<Iterable<Patient>> getPatients(Principal principal){
	  
	  return new ResponseEntity<Iterable<Patient>>(patientService.findAllPatients(), HttpStatus.OK);
  }
  
  @DeleteMapping("/deletePatient/{patientId}")
  public ResponseEntity<?> deletePatient(@PathVariable Long patientId, Principal principal){
	  
	  patientService.deletePatientByIdentifier(patientId);
	  return new ResponseEntity<String>("Patient with " + patientId + " deleted", HttpStatus.OK);
  }
	
}