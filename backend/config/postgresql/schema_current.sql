--updated schema_current by moving sequences in front of tables and adding db-level settings from schema.sql
CREATE EXTENSION postgis;

SET
  statement_timeout = 0;

SET
  lock_timeout = 0;

SET
  client_encoding = 'UTF8';

SET
  standard_conforming_strings = on;

SET
  check_function_bodies = false;

SET
  client_min_messages = warning;

SET
  search_path = public,
  pg_catalog;

SET
  default_tablespace = '';

SET
  default_with_oids = false;

CREATE
OR REPLACE FUNCTION public.trg_location() RETURNS trigger AS $ BODY $ BEGIN NEW.location := st_setsrid(
  st_makepoint(NEW.longitude, NEW.latitude),
  4326
);

RETURN NEW;

END $ BODY $ LANGUAGE plpgsql VOLATILE COST 100;

CREATE TRIGGER trg_location BEFORE
INSERT
  OR
UPDATE
  OF latitude,
  longitude ON room FOR EACH ROW EXECUTE PROCEDURE trg_location();

CREATE SEQUENCE city_city_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE neighborhood_neighborhood_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE search_area_search_area_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE survey_survey_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE survey_search_page_page_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE neighborhood_neighborhood_id_seq OWNED BY neighborhood.neighborhood_id;

ALTER SEQUENCE survey_search_page_page_id_seq OWNED BY survey_progress_log.page_id;

ALTER SEQUENCE survey_survey_id_seq OWNED BY survey.survey_id;

ALTER SEQUENCE search_area_search_area_id_seq OWNED BY search_area.search_area_id;

ALTER SEQUENCE city_city_id_seq OWNED BY city.city_id;

CREATE SEQUENCE super_survey_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE address_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE user_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE location_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE config_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE public.city (
  city_id integer NOT NULL DEFAULT nextval('city_city_id_seq' :: regclass),
  name character varying(255),
  search_area_id integer,
  CONSTRAINT city_pkey PRIMARY KEY (city_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.neighborhood (
  neighborhood_id integer NOT NULL DEFAULT nextval('neighborhood_neighborhood_id_seq' :: regclass),
  name character varying(255),
  search_area_id integer,
  CONSTRAINT neighborhood_pkey PRIMARY KEY (neighborhood_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.room (
  room_id integer NOT NULL,
  host_id integer,
  room_type character varying(255),
  country character varying(255),
  city character varying(255),
  neighborhood character varying(255),
  address character varying(1023),
  reviews integer,
  overall_satisfaction double precision,
  accommodates integer,
  bedrooms numeric(5, 2),
  bathrooms numeric(5, 2),
  price double precision,
  deleted integer,
  minstay integer,
  last_modified timestamp without time zone DEFAULT now(),
  latitude numeric(30, 6),
  longitude numeric(30, 6),
  survey_id integer NOT NULL DEFAULT 999999,
  location geometry,
  coworker_hosted integer,
  extra_host_languages character varying(255),
  name character varying(255),
  property_type character varying(255),
  currency character varying(20),
  rate_type character varying(20),
  CONSTRAINT room_pkey PRIMARY KEY (room_id, survey_id)
) WITH (OIDS = FALSE);

-- CREATE TABLE public.schema_version
-- (
--   version numeric(5,2) NOT NULL,
--   CONSTRAINT schema_version_pkey PRIMARY KEY (version)
-- )
-- WITH (
--   OIDS=FALSE
-- );
CREATE TABLE public.search_area (
  search_area_id integer NOT NULL DEFAULT nextval('search_area_search_area_id_seq' :: regclass),
  name character varying(255) DEFAULT 'UNKNOWN' :: character varying,
  abbreviation character varying(10),
  -- Short form for city: used in views, in particular.
  bb_n_lat double precision,
  bb_e_lng double precision,
  bb_s_lat double precision,
  bb_w_lng double precision,
  CONSTRAINT search_area_pkey PRIMARY KEY (search_area_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.survey (
  survey_id integer NOT NULL DEFAULT nextval('survey_survey_id_seq' :: regclass),
  ss_id integer,
  survey_description character varying(255),
  search_area_id integer,
  comment character varying(255),
  survey_method character varying(20) DEFAULT 'neighborhood' :: character varying,
  -- neighborhood or zipcode
  status smallint,
  CONSTRAINT survey_pkey PRIMARY KEY (survey_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.survey_progress_log (
  survey_id integer NOT NULL,
  room_type character varying(255) NOT NULL,
  neighborhood_id integer,
  page_number integer NOT NULL,
  guests integer NOT NULL,
  page_id integer NOT NULL DEFAULT nextval('survey_search_page_page_id_seq' :: regclass),
  has_rooms smallint,
  zoomstack character varying(255),
  CONSTRAINT survey_search_page_pkey PRIMARY KEY (page_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.survey_progress_log_bb (
  survey_id integer NOT NULL,
  room_type character varying(255),
  guests integer,
  price_min double precision,
  price_max double precision,
  quadtree_node character varying(1024),
  last_modified timestamp without time zone DEFAULT now(),
  median_node text,
  CONSTRAINT survey_progress_log_bb_pkey PRIMARY KEY (survey_id)
) WITH (OIDS = FALSE);

CREATE TABLE public.zipcode (
  zipcode character varying(10) NOT NULL,
  search_area_id integer,
  CONSTRAINT z PRIMARY KEY (zipcode),
  CONSTRAINT zipcode_search_area_id_fkey FOREIGN KEY (search_area_id) REFERENCES public.search_area (search_area_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) WITH (OIDS = FALSE);

CREATE TABLE public.zipcode_us (
  zip integer NOT NULL,
  type character varying(20),
  primary_city character varying(50),
  acceptable_cities character varying(300),
  state character varying(3),
  county character varying(50),
  timezone character varying(50),
  area_code character varying(50),
  latitude numeric(6, 2),
  longitude numeric(6, 2),
  world_region character varying(10),
  country character varying(20),
  decommissioned integer,
  estimated_population integer,
  notes character varying(255),
  CONSTRAINT pk_zipcode PRIMARY KEY (zip)
) WITH (OIDS = FALSE);

CREATE TABLE public.booking_reviews (
  review_id integer NOT NULL,
  hotel_id integer,
  room_id integer,
  reviewer_id integer,
  reviewer_name character varying(1023),
  country character varying(1023),
  date character varying(1023),
  review_title character varying(5000),
  review_body character varying(5000),
  response integer,
  room character varying(1023),
  stay_date character varying(1023),
  rating character varying(1023),
  last_modified timestamp without time zone DEFAULT now()
) WITH (OIDS = FALSE);

CREATE TABLE public.super_survey (
  ss_id integer NOT NULL DEFAULT nextval('super_survey_id_seq' :: regclass),
  timedate date DEFAULT ('now' :: text) :: date,
  city character varying(255),
) WITH (OIDS = FALSE);

CREATE TABLE public.location (
  location_id integer NOT NULL DEFAULT nextval('location_id_seq' :: regclass),
  route character varying(255),
  neighborhood character varying(255),
  sublocality character varying(255),
  locality character varying(255),
  level2 character varying(255),
  level1 character varying(255),
  country character varying(255),
  lat_round character varying(255),
  lng_round character varying(255),
  zipcode character varying(20)
) WITH (OIDS = FALSE);

CREATE TABLE public.booking_room (
  room_id integer NOT NULL,
  accommodates integer,
  address character varying(1023),
  bathroom_type numeric(5, 2),
  bed_type character varying(255),
  comodities character varying(3000),
  hotel_name character varying(255),
  last_modified timestamp without time zone DEFAULT now(),
  latitude numeric(30, 6),
  longitude numeric(30, 6),
  overall_satisfaction double precision,
  price double precision,
  property_type character varying(255),
  rate_type character varying(20),
  reviews integer,
  room_name character varying(255),
  survey_id integer NOT NULL DEFAULT 999999,
  checkin_date varchar(15),
  checkout_date varchar(15)
) WITH (OIDS = FALSE);

CREATE TABLE public.address (
  adress_id integer NOT NULL DEFAULT nextval('address_id_seq' :: regclass),
  route character varying(255),
  sublocality character varying(255),
  city character varying(255),
  state character varying(255),
  country character varying(255)
) WITH (OIDS = FALSE);

CREATE TABLE public.users (
  user_id integer NOT NULL DEFAULT nextval('user_id_seq' :: regclass),
  name character varying(255),
  email character varying(255),
  password character varying(255),
  CONSTRAINT user_pkey PRIMARY KEY (user_id)
) WITH (OIDS = FALSE);

ALTER TABLE
  users
ADD
  CONSTRAINT user_unique_constraint UNIQUE (email);

CREATE TABLE public.super_survey_config (
  config_id integer NOT NULL DEFAULT nextval('config_id_seq' :: regclass),
  platform character varying(100) not null,
  search_area_name character varying(100) not null,
  user_id integer not null default 1,
  data_columns character varying(1000) [],
  clusterization_method character varying(100),
  aggregation_method character varying(50),
  fill_airbnb_with_selenium boolean,
  start_date character varying(15),
  finish_date character varying(15),
  include_locality_search boolean default True,
  include_route_search boolean default True,
  CONSTRAINT config_pkey PRIMARY KEY (config_id)
) WITH (OIDS = FALSE);