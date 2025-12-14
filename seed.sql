-- Insert sample products
insert into public.products (name, name_he, category, description, description_he, is_hidden, image)
values
  ('Porte Standart', 'דלת סטנדרט', 'doors', 'Une porte classique de haute qualité.', 'דלת קלאסית באיכות גבוהה.', false, 'door-sample.jpg'),
  ('Poignée Moderne', 'ידית מודרנית', 'accessories', 'Accessoire élégant pour vos portes.', 'אביזר אלגנטי לדלתות שלך.', false, 'handle-sample.jpg');
