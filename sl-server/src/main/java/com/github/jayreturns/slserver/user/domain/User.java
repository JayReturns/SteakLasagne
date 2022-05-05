package com.github.jayreturns.slserver.user.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "user")
@Getter
@Setter
public class User {

    @Id
    @Column(name = "id", nullable = false, unique = true)
    private String Id;

    @Column(name = "friendly_name")
    private String FriendlyName;

    @Column(name = "current_amount")
    private Double CurrentAmount;

}
