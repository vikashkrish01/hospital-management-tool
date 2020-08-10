package com.api.project.hospitalmanagement.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "information")
public class Information {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
	
	@Column(unique= true, updatable = false)
    @NotNull
	private String officialIdNumber;
	
	@Column(name = "title")
    private String title;

	

	@Column(name = "infoValue")
	    private String infoValue;
	
	 
	 @ManyToOne(fetch=FetchType.EAGER)
	 private Patient patient;
	 
	 public Information(Long id, @NotNull String officialIdNumber, String infoValue, String title, Patient patient) {
		super();
		this.id = id;
		this.officialIdNumber = officialIdNumber;
		this.infoValue = infoValue;
		this.patient = patient;
		this.title= title;
	}


	public Information(){
		 
	 }
	 

	 public String getOfficialIdNumber() {
			return officialIdNumber;
		}


		public void setOfficialIdNumber(String officialIdNumber) {
			this.officialIdNumber = officialIdNumber;
		}
	
		
		public String getTitle() {
			return title;
		}


		public void setTitle(String title) {
			this.title = title;
		}
		
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getInfoValue() {
		return infoValue;
	}

	public void setInfoValue(String infoValue) {
		this.infoValue = infoValue;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}


}
