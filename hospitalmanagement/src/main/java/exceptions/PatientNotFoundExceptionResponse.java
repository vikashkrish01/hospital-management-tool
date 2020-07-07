package exceptions;

public class PatientNotFoundExceptionResponse {

	private String officialIdNumber;
	
	public PatientNotFoundExceptionResponse(String officialIdNumber){
		this.officialIdNumber = officialIdNumber;
	}

	public String getPatinetIdentifier() {
		return officialIdNumber;
	}

	public void setPatientIdentifier(String officialIdNumber) {
		this.officialIdNumber = officialIdNumber;
	}
	
}
