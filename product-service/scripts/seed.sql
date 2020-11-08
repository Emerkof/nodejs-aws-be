CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(19, 2),
  ingredients jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS stocks (
  product_id uuid PRIMARY KEY REFERENCES products(id),
  count INTEGER
);

BEGIN;

INSERT INTO products (title, description, price, ingredients, image_url) VALUES
  (
    'Mohito',
    'Traditional Cuban highball.',
    7.50,
    '["White rum", "Sugar", "Lime juice", "Soda water", "Mint"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/mohito.jpg'
  ),
  (
    'Blue Lagoon',
    'Blue Curaçao mixed with vodka and lemonade.',
    5.00,
    '["Blue curacao", "Vodka", "Lemonade"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/blue-lagoon.jpg'
  ),
  (
    'Mai Tai',
    'The Mai Tai is a cocktail based on rum, Curaçao liqueur, orgeat syrup, and lime juice.',
    15.00,
    '["White rum", "Dark rum", "Lime juice", "Orange curacao", "Orgear syrup"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/mai-tai.jpg'
  ),
  (
    'Margarita',
    'A margarita is a Mexican cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass.',
    10.00,
    '["Cointreau", "Lime juice", "Tequila"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/margarita.jpg'
  ),
  (
    'Old Fashioned',
    'The old fashioned is a cocktail made by muddling sugar with bitters and water, adding whiskey or, less commonly, brandy, and garnishing with orange slice or zest and a cocktail cherry.',
    12.00,
    '["Bourbon", "Sugar", "Angostura bitters", "Plain water"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/old-fashioned.jpg'
  ),
  (
    'Pina Colada',
    'The piña colada is a sweet cocktail made with rum, cream of coconut or coconut milk, and pineapple juice, usually served either blended or shaken with ice.',
    12.50,
    '["White rum", "Coconut liquor", "Pineapple juice"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/pina-colada.jpg'
  ),
  (
    'Queens Park Swizzle',
    'More drier, complex variation of the original Mohito cocktail.',
    14.50,
    '["Dark rum", "Lime juice", "Demerara", "Angostura bitters", "Mint"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/queens-park-swizzle.jpg'
  ),
  (
    'Tequila Sunrise',
    'The tequila sunrise is a cocktail made of tequila, orange juice, and grenadine syrup. It''s served unmixed in a tall glass.The tequila sunrise is a cocktail made of tequila, orange juice, and grenadine syrup. It''s served unmixed in a tall glass.',
    9.50,
    '["Tequila", "Grenadine syrup", "Orange juice"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/tequila-sunrise.jpg'
  ),
  (
    'White Russian',
    'A White Russian is a cocktail made with vodka, coffee liqueur and cream served with ice in an Old Fashioned glass.',
    11.00,
    '["Vodka", "Fresh cream", "Coffee liqueur"]',
    'https://easy-n-dizzy-assets.s3-eu-west-1.amazonaws.com/white-russian.jpg'
  );

INSERT INTO stocks (product_id, count) VALUES
  ((SELECT id FROM products WHERE title = 'Mohito'), 35),
  ((SELECT id FROM products WHERE title = 'Blue Lagoon'), 43),
  ((SELECT id FROM products WHERE title = 'Mai Tai'), 20),
  ((SELECT id FROM products WHERE title = 'Margarita'), 25),
  ((SELECT id FROM products WHERE title = 'Old Fashioned'), 8),
  ((SELECT id FROM products WHERE title = 'Pina Colada'), 31),
  ((SELECT id FROM products WHERE title = 'Queens Park Swizzle'), 14),
  ((SELECT id FROM products WHERE title = 'Tequila Sunrise'), 41),
  ((SELECT id FROM products WHERE title = 'White Russian'), 36);

COMMIT;
