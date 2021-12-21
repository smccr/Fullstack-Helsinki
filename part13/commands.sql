CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    date TIME
);

INSERT INTO blogs (author, url, title) values ('Dan Abramov', 'www.abramov.com', 'On let vs const');
INSERT INTO blogs (author, url, title) values ('Laurenz Albe', 'www.albe.com', 'Gaps in sequences in PostgreSQL');