Use GR8DB8;

INSERT INTO posts (id, topic, description, category, start, expired, createdAt, updatedAt)
VALUES ("1", "Its the end of the world, right?", "Armagettingready! or Amagettwhat?", "science", CURRENT_TIME(), false , CURRENT_TIME(), CURRENT_TIME());
INSERT INTO posts (id, topic, description, category, start, expired, createdAt, updatedAt)
VALUES ("2", "Who better, Superman or Batman?", "The battle of Caped Crusaders", "comics", CURRENT_TIME(), false, CURRENT_TIME(), CURRENT_TIME());
INSERT INTO posts (id, topic, description, category, start, expired, createdAt, updatedAt)
VALUES ("3", "StarTrek or Star Wars, which is more awesome", "We know the right answer but its fun to ask anyway", "film", CURRENT_TIME(), true, CURRENT_TIME(), CURRENT_TIME());

INSERT INTO users (id, username, email, password, createdAt, updatedAt)
VALUES ("12345", "batman", "batman@aol.com", "123456", CURRENT_TIME(), CURRENT_TIME());
INSERT INTO users (id, username, email, password, createdAt, updatedAt)
VALUES ("54321", "superman", "superman@aol.com", "123456", CURRENT_TIME(), CURRENT_TIME());
INSERT INTO users (id, username, email, password, createdAt, updatedAt)
VALUES ("45234", "spidey", "spidey@aol.com", "123456", CURRENT_TIME(), CURRENT_TIME());

INSERT INTO comments (body, createdAt, updatedAt, UserId, PostId)
VALUES ("Sky is falling", true, "I swear I saw something falling out of the sky", CURRENT_TIME(), CURRENT_TIME(), "12345", "1");
INSERT INTO comments (body, createdAt, updatedAt, UserId, PostId)
VALUES ("Superman is better than Batman", false, "Batman is just plain awesome", CURRENT_TIME(), CURRENT_TIME(), "54321" , "2");
INSERT INTO comments (body, createdAt, updatedAt, UserId, PostId)
VALUES ("Star Trek is Better than Star Wars", false, "What planet were you born on where Star Trek is better than Star Wars", CURRENT_TIME(), CURRENT_TIME(), "45234", "3");
