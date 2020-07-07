package com.api.project.hospitalmanagement.entity;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.MapKey;
import javax.persistence.MapKeyColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "patient")
public class Patient {

	@Column
	@NotNull
	private String patientName;
	
	
    @Column(unique= true, updatable = false)
    @NotNull
    @NotBlank(message ="Patient Id is required")
	private String officialIdNumber;
    @Id
    @Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long systemIdNumber;
	
    @JsonFormat(pattern = "yyyy-mm-dd")
    @NotNull
    @Column(updatable=false)
	private Date birthDate;
	
    @NotNull
    @NotBlank(message ="Patient email is required")
	private String email;
	
    @ElementCollection
	@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval=true)
	@MapKeyColumn(name = "meta_keys")
	private Map<String,Information> metaData = new HashMap<String, Information>();
	
	public Patient(){
		
	}

	public Patient(String patientName, String officialIdNumber, Long systemIdNumber, Date birthDate, String email,
			Map<String, Information> metaData) {
		super();
		this.patientName = patientName;
		this.officialIdNumber = officialIdNumber;
		this.systemIdNumber = systemIdNumber;
		this.birthDate = birthDate;
		this.email = email;
		this.metaData = metaData;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getOfficialIdNumber() {
		return officialIdNumber;
	}

	public void setOfficialIdNumber(String officialIdNumber) {
		this.officialIdNumber = officialIdNumber;
	}

	public Long getSystemIdNumber() {
		return systemIdNumber;
	}

	public void setSystemIdNumber(Long systemIdNumber) {
		this.systemIdNumber = systemIdNumber;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Map<String, Information> getMetaData() {
		return metaData;
	}

	public void setMetaData(Map<String, Information> metaData) {
		this.metaData = metaData;
	}
	
}
