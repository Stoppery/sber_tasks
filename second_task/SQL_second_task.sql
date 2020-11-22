CREATE DATABASE stoppery
    WITH 
    OWNER = stoppery
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

---------------------------------------------------------

CREATE SCHEMA myschema
    AUTHORIZATION stoppery;

---------------------------------------------------------

CREATE TABLE myschema.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    username text COLLATE pg_catalog."default",
    displayname text COLLATE pg_catalog."default",
    nickname text COLLATE pg_catalog."default",
    usertype text COLLATE pg_catalog."default",
    title text COLLATE pg_catalog."default",
    preferredlanguage text COLLATE pg_catalog."default",
    locale text COLLATE pg_catalog."default",
    timezone text COLLATE pg_catalog."default",
    active boolean,
    password text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE myschema.users
    OWNER to stoppery;

---------------------------------------------------------

CREATE TABLE myschema.addresses
(
    id text COLLATE pg_catalog."default" NOT NULL,
    u_id_fk text COLLATE pg_catalog."default",
    streetaddress text COLLATE pg_catalog."default",
    locality text COLLATE pg_catalog."default",
    region text COLLATE pg_catalog."default",
    postalcode integer,
    country text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    primar boolean,
    CONSTRAINT addresses_pkey PRIMARY KEY (id),
    CONSTRAINT addresses_u_id_fk_fkey FOREIGN KEY (u_id_fk)
        REFERENCES myschema.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE myschema.addresses
    OWNER to stoppery;

---------------------------------------------------------

CREATE TABLE myschema.emails
(
    id text COLLATE pg_catalog."default" NOT NULL,
    u_id_fk text COLLATE pg_catalog."default",
    value text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    primar boolean,
    CONSTRAINT emails_pkey PRIMARY KEY (id),
    CONSTRAINT emails_u_id_fk_fkey FOREIGN KEY (u_id_fk)
        REFERENCES myschema.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE myschema.emails
    OWNER to stoppery;

---------------------------------------------------------

CREATE TABLE myschema.name
(
    u_id_fk text COLLATE pg_catalog."default" NOT NULL,
    formatted text COLLATE pg_catalog."default",
    familyname text COLLATE pg_catalog."default",
    givenname text COLLATE pg_catalog."default",
    middlename text COLLATE pg_catalog."default",
    honorificprefix text COLLATE pg_catalog."default",
    CONSTRAINT name_pkey PRIMARY KEY (u_id_fk),
    CONSTRAINT name_u_id_fk_fkey FOREIGN KEY (u_id_fk)
        REFERENCES myschema.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE myschema.name
    OWNER to postgres;

---------------------------------------------------------

CREATE TABLE myschema.phonenumbers
(
    id text COLLATE pg_catalog."default" NOT NULL,
    u_id_fk text COLLATE pg_catalog."default",
    value text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    CONSTRAINT phonenumbers_pkey PRIMARY KEY (id),
    CONSTRAINT phonenumbers_u_id_fk_fkey FOREIGN KEY (u_id_fk)
        REFERENCES myschema.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE myschema.phonenumbers
    OWNER to stoppery;