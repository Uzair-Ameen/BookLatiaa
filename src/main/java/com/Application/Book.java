package com.Application;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public @Data
class Book {
    private String publisher;
    private String name;
    private Double price;
    private String genre;
    private String description;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "auther")
    private AutherEntity auther;
}
