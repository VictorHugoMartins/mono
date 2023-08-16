create
or replace view city_survey as
select
  sa.name as city,
  max(s.survey_id) as newer,
  max(s.survey_id) as older
from
  survey as s
  join search_area as sa on s.search_area_id = sa.search_area_id
group by
  city
having
  count(*) > 1;

create
or replace function survey_room (in integer) returns table (
  room_id integer,
  host_id integer,
  room_type varchar(255),
  country varchar(255),
  city varchar(255),
  neighborhood varchar(255),
  address varchar(1023),
  reviews integer,
  overall_satisfaction double precision,
  accommodates integer,
  bedrooms decimal(5, 2),
  bathrooms decimal(5, 2),
  price double precision,
  deleted integer,
  minstay integer,
  last_modified timestamp,
  latitude numeric(30, 6),
  longitude numeric(30, 6),
  survey_id integer
) as $ BODY $
select
  room_id,
  host_id,
  room_type,
  country,
  city,
  neighborhood,
  address,
  reviews,
  overall_satisfaction,
  accommodates,
  bedrooms,
  bathrooms,
  price,
  deleted,
  minstay,
  last_modified,
  latitude,
  longitude,
  survey_id
from
  room as r
where
  r.survey_id = $ 1
  and price is not null
  and deleted = 0;

$ BODY $ language sql;

drop function if exists survey_host(int);

create function survey_host(in integer) returns table (
  host_id int,
  rooms bigint,
  multilister smallint,
  review_count bigint,
  addresses bigint,
  rating numeric(4, 2),
  income1 double precision,
  income2 double precision
) as $ BODY $
select
  host_id,
  count(*) as rooms,
  cast(
    (
      case
        when count(*) > 1 then 1
        else 0
      end
    ) as smallint
  ) as multilister,
  sum(reviews) as review_count,
  count(distinct address) as addresses,
  cast(
    sum(overall_satisfaction * reviews) / sum(reviews) as numeric(4, 2)
  ) as rating,
  sum(reviews * price) as income1,
  sum(reviews * price * minstay) as income2
from
  survey_room($ 1)
where
  reviews > 0
  and minstay is not null
group by
  host_id;

$ BODY $ language sql;

create
or replace function add_survey(in varchar(255)) RETURNS VOID as $ BODY $
insert into
  survey(survey_description, search_area_id)
select
  (name || ' (' || current_date || ')') as survey_description,
  search_area_id
from
  search_area
where
  name = $ 1;

$ BODY $ language sql;

create
or replace function new_room(
  in old_survey_id integer,
  in new_survey_id integer
) returns table ("room_id" integer) as $ BODY $
select
  "room_id"
from
  (
    select
      "room_id"
    from
      "survey_room"(new_survey_id)
    except
    select
      "room_id"
    from
      "survey_room"(old_survey_id)
  ) as "t" $ BODY $ language sql;

CREATE
OR REPLACE VIEW rooms_repeat AS
SELECT
  b.room_id,
  b.hotel_name AS name,
  b.room_name AS hotel_name,
  b.property_type AS property_type,
  b.room_type AS room_type,
  NULL :: integer AS host_id,
  b.price AS price,
  b.reviews AS reviews,
  NULL :: numeric AS minstay,
  b.avg_rating AS avg_rating,
  b.accommodates AS accommodates,
  b.bedrooms AS bedrooms,
  b.bathrooms AS bathrooms,
  NULL :: text AS bathroom,
  b.latitude AS latitude,
  b.longitude AS longitude,
  NULL :: text AS extra_host_languages,
  NULL :: numeric AS is_superhost,
  b.comodities AS comodities,
  location.location_id,
  location.route,
  location.sublocality,
  location.locality,
  'Booking' :: text AS platform,
  b.survey_id AS survey_id
FROM
  booking_room b
  JOIN location ON location.location_id = b.location_id
  JOIN survey ON survey.survey_id = b.survey_id
GROUP BY
  location.locality,
  location.sublocality,
  location.route,
  location.location_id,
  b.room_id,
  host_id,
  b.hotel_name,
  b.room_name,
  b.property_type,
  b.room_type,
  b.price,
  b.reviews,
  minstay,
  b.avg_rating,
  b.accommodates,
  b.bedrooms,
  b.bathrooms,
  bathroom,
  b.latitude,
  b.longitude,
  b.comodities,
  b.survey_id,
  is_superhost,
  extra_host_languages
UNION
ALL
SELECT
  a.room_id,
  a.host_id :: character varying AS name,
  a.name AS hotel_name,
  a.property_type AS property_type,
  a.room_type AS room_type,
  a.host_id AS host_id,
  a.price AS price,
  a.reviews AS reviews,
  a.minstay AS minstay,
  a.avg_rating AS avg_rating,
  a.accommodates AS accommodates,
  a.bedrooms AS bedrooms,
  a.bathrooms AS bathrooms,
  a.bathroom AS bathroom,
  a.latitude AS latitude,
  a.longitude AS longitude,
  a.extra_host_languages :: text AS extra_host_languages,
  a.is_superhost :: integer AS is_superhost,
  a.comodities AS comodities,
  location.location_id,
  location.route,
  location.sublocality,
  location.locality,
  'Airbnb' :: text AS platform,
  a.survey_id AS survey_id
FROM
  room a
  JOIN location ON location.location_id = a.location_id
  JOIN survey ON survey.survey_id = a.survey_id
GROUP BY
  location.locality,
  location.sublocality,
  location.route,
  location.location_id,
  a.room_id,
  a.host_id,
  a.name,
  hotel_name,
  a.property_type,
  a.room_type,
  a.price,
  a.reviews,
  a.minstay,
  a.avg_rating,
  a.accommodates,
  a.bedrooms,
  a.bathrooms,
  a.bathroom,
  a.latitude,
  a.longitude,
  a.extra_host_languages,
  a.survey_id,
  a.is_superhost,
  a.comodities

--   create or replace view accommodates_avg as  SELECT b.room_id,
--     string_agg(DISTINCT b.hotel_name::text, ' JOIN '::text) AS name,
--     string_agg(DISTINCT b.room_name::text, ' JOIN '::text) AS hotel_name,
--     string_agg(DISTINCT b.property_type::text, ' JOIN '::text) AS property_type,
--     string_agg(DISTINCT b.room_type::text, ' JOIN '::text) AS room_type,
--     string_agg(DISTINCT b.hotel_id, ' JOIN '::text) AS host_id,
--     avg(b.price) AS price,
--     max(b.reviews) AS reviews,
--     NULL::numeric AS minstay,
--     avg(b.avg_rating) AS avg_rating,
--     avg(b.accommodates::numeric) AS accommodates,
--     avg(b.bedrooms::numeric) AS bedrooms,
--     avg(b.bathrooms::numeric) AS bathrooms,
--     NULL::text AS bathroom,
--     max(b.latitude) AS latitude,
--     max(b.longitude) AS longitude,
--     NULL::text AS extra_host_languages,
--     NULL::numeric AS is_superhost,
--     string_agg(DISTINCT b.comodities::text, ' JOIN '::text) AS comodities,
--     location.location_id,
--     location.route,
--     location.sublocality,
--     location.locality,
--     'Booking'::text AS platform,
--     string_agg(DISTINCT b.survey_id::text, ','::text) AS survey_id
--    FROM booking_room b
--      JOIN location ON location.location_id = b.location_id
--      JOIN survey ON survey.survey_id = b.survey_id
--   WHERE (b.survey_id IN ( SELECT DISTINCT s.survey_id
--            FROM survey s
--           WHERE s.ss_id = 111))
--   GROUP BY location.locality, location.sublocality, location.route, location.location_id, b.room_id
-- UNION ALL
--  SELECT a.room_id,
--     string_agg(DISTINCT a.name::character varying::text, ' JOIN '::text) AS name,
--     NULL::text AS hotel_name,
--     string_agg(DISTINCT a.property_type::text, ' JOIN '::text) AS property_type,
--     string_agg(DISTINCT a.room_type::text, ' JOIN '::text) AS room_type,
--     string_agg(DISTINCT a.host_id::text, ' JOIN '::text) AS host_id,
--     avg(a.price) AS price,
--     max(a.reviews::numeric) AS reviews,
--     avg(a.minstay::numeric) AS minstay,
--     avg(a.avg_rating) AS avg_rating,
--     avg(a.accommodates::numeric) AS accommodates,
--     avg(a.bedrooms::numeric) AS bedrooms,
--     avg(a.bathrooms::numeric) AS bathrooms,
--     string_agg(DISTINCT a.bathroom::text, ' JOIN '::text) AS bathroom,
--     max(a.latitude) AS latitude,
--     max(a.longitude) AS longitude,
--     string_agg(DISTINCT a.extra_host_languages::text, 'JOIN '::text) AS extra_host_languages,
--     avg(a.is_superhost::integer) AS is_superhost,
--     string_agg(DISTINCT a.comodities::text, ' JOIN '::text) AS comodities,
--     location.location_id,
--     location.route,
--     location.sublocality,
--     location.locality,
--     'Airbnb'::text AS platform,
--     string_agg(DISTINCT a.survey_id::text, ','::text) AS survey_id
--    FROM room a
--      JOIN location ON location.location_id = a.location_id
--      JOIN survey ON survey.survey_id = a.survey_id
--   GROUP BY location.locality, location.sublocality, location.route, location.location_id, a.room_id;