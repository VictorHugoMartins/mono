-- Reader
CREATE ROLE reader NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

COMMENT ON ROLE reader IS 'Read-only access to the database to do data analysis';

GRANT USAGE ON SCHEMA public TO reader;

GRANT
SELECT
  ON ALL TABLES IN SCHEMA public TO reader;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO reader;

GRANT USAGE ON SCHEMA gis TO reader;

GRANT
SELECT
  ON ALL TABLES IN SCHEMA gis TO reader;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gis TO reader;

GRANT
SELECT
  ON ALL TABLES IN SCHEMA publish TO reader;

CREATE ROLE a_reader LOGIN NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION PASSWORD 'airbnb5432';

GRANT reader TO a_reader;

COMMENT ON ROLE a_reader IS 'For data analytics use';

-- Editor
CREATE ROLE editor NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

COMMENT ON ROLE editor IS 'DML use to read and write data';

GRANT USAGE ON SCHEMA public TO editor;

GRANT
SELECT
,
INSERT
,
UPDATE
,
  DELETE ON ALL TABLES IN SCHEMA public TO editor;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO editor;

GRANT USAGE,
SELECT
  ON ALL SEQUENCES IN SCHEMA public TO editor;

GRANT USAGE ON SCHEMA gis TO editor;

GRANT
SELECT
,
INSERT
,
UPDATE
,
  DELETE ON ALL TABLES IN SCHEMA gis TO editor;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA gis TO editor;

CREATE ROLE an_editor LOGIN NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION PASSWORD 'airbnb5432';

GRANT editor TO an_editor;

COMMENT ON ROLE an_editor IS 'For data collection and application';

CREATE
OR REPLACE VIEW newview AS
SELECT
  room_id,
  STRING_AGG(DISTINCT hotel_name, ' JOIN ') AS name,
  STRING_AGG(DISTINCT room_name, ' JOIN ') AS hotel_name,
  STRING_AGG(DISTINCT property_type, ' JOIN ') AS property_type,
  STRING_AGG(DISTINCT room_type, ' JOIN ') AS room_type,
  AVG(price) AS price,
  AVG(reviews) AS reviews,
  null AS minstay,
  AVG(overall_satisfaction) AS avg_rating,
  AVG(accommodates) AS accommodates,
  AVG(bedrooms) AS bedrooms,
  AVG(bathrooms) AS bathrooms,
  null as bathroom,
  MAX(latitude) AS latitude,
  MAX(longitude) AS longitude,
  null as extra_host_languages,
  null as is_superhost,
  STRING_AGG(DISTINCT comodities, ' JOIN ') AS comodities,
  location.location_id,
  location.route,
  location.sublocality,
  location.locality,
  'Booking' as platform,
  MIN(b.survey_id) as survey_id
FROM
  booking_room as b
  INNER JOIN location ON location.location_id = b.location_id
  INNER JOIN survey ON survey.survey_id = b.survey_id
GROUP BY
  locality,
  location.sublocality,
  location.route,
  location.location_id,
  room_id
UNION
ALL
SELECT
  room_id,
  STRING_AGG(DISTINCT CAST(host_id AS varchar), ' JOIN ') AS host_id,
  STRING_AGG(DISTINCT name, ' JOIN ') AS name,
  STRING_AGG(DISTINCT property_type, ' JOIN ') AS property_type,
  STRING_AGG(DISTINCT room_type, ' JOIN ') AS room_type,
  AVG(price) AS price,
  AVG(reviews) AS reviews,
  AVG(minstay) AS minstay,
  AVG(avg_rating) AS avg_rating,
  AVG(accommodates) AS accommodates,
  AVG(bedrooms) AS bedrooms,
  AVG(bathrooms) AS bathrooms,
  STRING_AGG(DISTINCT bathroom, ' JOIN ') AS bathrooms,
  MAX(latitude) AS latitude,
  MAX(longitude) AS longitude,
  STRING_AGG(DISTINCT extra_host_languages, 'JOIN ') AS extra_host_languages,
  AVG(CAST(is_superhost AS int)) AS is_superhost,
  STRING_AGG(DISTINCT comodities, ' JOIN ') AS comodities,
  location.location_id,
  location.route,
  location.sublocality,
  location.locality,
  'Airbnb' as platform,
  MIN(room.survey_id) as survey_id
FROM
  room
  INNER JOIN location ON location.location_id = room.location_id
  INNER JOIN survey ON survey.survey_id = room.survey_id
GROUP BY
  locality,
  location.sublocality,
  location.route,
  location.location_id,
  room_id