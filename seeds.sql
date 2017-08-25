Use GR8DB8;
INSERT INTO posts (headline, position, body, createdAt, updatedAt, UserId, TopicId)
VALUES ("Sky is falling", true, "I swear I saw something falling out of the sky", CURRENT_TIME(), CURRENT_TIME(), "12345", "1");
INSERT INTO posts (headline, position, body, createdAt, updatedAt)
VALUES ("Superman is better than Batman", false, "Batman is just plain awesome", CURRENT_TIME(), CURRENT_TIME(), "54321" , "2");
INSERT INTO posts (headline, position, body, createdAt, updatedAt)
VALUES ("Star Trek is Better than Star Wars", false, "What planet were you born on where Star Trek is better than Star Wars", CURRENT_TIME(), CURRENT_TIME(), "45234", "3");

INSERT INTO users (id, username, email, password, createdAt, updatedAt)
VALUES ("12345", "batman", "batman@aol.com", "123456", CURRENT_TIME(), CURRENT_TIME());
INSERT INTO users (id, username, email, password, createdAt, updatedAt)
VALUES ("54321", "superman", "superman@aol.com", "123456", CURRENT_TIME(), CURRENT_TIME());
INSERT INTO users (id, username, email, password, createdAt, updatedAt)
VALUES ("45234", "spidey", "spidey@aol.com", "123456", CURRENT_TIME(), CURRENT_TIME());

INSERT INTO topics (id, question, category, start, expired, createdAt, updatedAt)
VALUES ("1", "Its the end of the world, right?", "science", CURRENT_TIME(), false , CURRENT_TIME(), CURRENT_TIME());
INSERT INTO topics (question, category, start, expired, createdAt, updatedAt)
VALUES ("2", "Who better, Superman or Batman?", "comics", CURRENT_TIME(), false, CURRENT_TIME(), CURRENT_TIME());
INSERT INTO topics (question, category, start, expired, createdAt, updatedAt)
VALUES ("3", "StarTrek or Star Wars, which is more awesome", "film", CURRENT_TIME(), true, CURRENT_TIME(), CURRENT_TIME());
