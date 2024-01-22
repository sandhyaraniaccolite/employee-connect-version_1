package com.employeeconnect.model;


import javax.persistence.*;

@Entity
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "role_id")
	private Long roleId;
	@Column(name = "role_name")
	private String roleName;
	@Column(name="active")
	private boolean active=true;
	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}
	enum Name{
		Admin,HR,Employee,Manager,CEO,RM
	}
	
	
	public Role() {}


	public Long getRoleId() {
		return roleId;
	}


	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}


	public String getRoleName() {
		return roleName;
	}


	public void setRoleName(String roleName) {
		Name name=null;
		try {
			name = Name.valueOf(roleName);
		}catch(Exception e) {
			throw new RuntimeException("Enter a valid Role");
		}
		this.roleName = name.toString();
	}
	
	
}
