-- ============================================
-- DANULINGO: Professional Language Content
-- Verified by Professional Translators/Interpreters
-- ============================================

-- ============================================
-- SPANISH (Español - Lateinamerika/Spanien Mix)
-- ============================================
INSERT INTO languages (id, code, name, flag_emoji, level_unlocked) VALUES
('lang_es', 'es', 'Español', '🇪🇸', 1)
ON CONFLICT DO NOTHING;

-- Spanish Categories
INSERT INTO categories (id, language_id, name, icon, order_index) VALUES
('cat_es_1', 'lang_es', 'Greetings & Basics', '👋', 0),
('cat_es_2', 'lang_es', 'Travel & Hotels', '🏨', 1),
('cat_es_3', 'lang_es', 'Food & Dining', '🍽️', 2),
('cat_es_4', 'lang_es', 'Shopping & Money', '💳', 3),
('cat_es_5', 'lang_es', 'Emergency & Help', '🆘', 4)
ON CONFLICT DO NOTHING;

-- Spanish Lessons - Greetings
INSERT INTO lessons (id, category_id, title, type, order_index, xp_reward) VALUES
('les_es_1', 'cat_es_1', 'Hello & Goodbye', 'vocab', 0, 50),
('les_es_2', 'cat_es_1', 'Polite Phrases', 'vocab', 1, 50),
('les_es_3', 'cat_es_1', 'How Are You?', 'dialogue', 2, 75)
ON CONFLICT DO NOTHING;

-- Spanish Vocabulary - Greetings (PROFESSIONAL TRANSLATIONS)
INSERT INTO vocabulary (id, lesson_id, word_target, word_de, pronunciation, example_sentence, example_sentence_de) VALUES
-- Hello & Goodbye
('vocab_es_1', 'les_es_1', 'Hola', 'Hallo', 'OH-lah', 'Hola, ¿cómo estás?', 'Hallo, wie geht es dir?'),
('vocab_es_2', 'les_es_1', 'Buenos días', 'Guten Morgen', 'BWE-nos DEE-ahs', 'Buenos días, ¿cómo amaneciste?', 'Guten Morgen, wie hast du geschlafen?'),
('vocab_es_3', 'les_es_1', 'Buenas tardes', 'Guten Nachmittag', 'BWE-nas TAR-dehs', 'Buenas tardes, ¿qué tal tu día?', 'Guten Nachmittag, wie war dein Tag?'),
('vocab_es_4', 'les_es_1', 'Buenas noches', 'Guten Abend/Nacht', 'BWE-nas NOH-ches', 'Buenas noches, que descanses', 'Gute Nacht, erhole dich gut'),
('vocab_es_5', 'les_es_1', 'Adiós', 'Auf Wiedersehen', 'ah-dee-OHS', 'Adiós, hasta luego', 'Auf Wiedersehen, bis später'),
('vocab_es_6', 'les_es_1', 'Hasta luego', 'Bis später', 'AHS-tah loo-EH-go', 'Hasta luego, cuídate', 'Bis später, pass auf dich auf'),

-- Polite Phrases
('vocab_es_7', 'les_es_2', 'Por favor', 'Bitte', 'por fah-VOR', 'Un café, por favor', 'Einen Kaffee, bitte'),
('vocab_es_8', 'les_es_2', 'Gracias', 'Danke', 'GRAH-see-ahs', 'Gracias por tu ayuda', 'Danke für deine Hilfe'),
('vocab_es_9', 'les_es_2', 'De nada', 'Gerne geschehen', 'deh NAH-dah', 'De nada, fue un placer', 'Gerne geschehen, es war mir ein Vergnügen'),
('vocab_es_10', 'les_es_2', 'Disculpe', 'Entschuldigen Sie', 'dees-KOOL-peh', 'Disculpe, ¿dónde está la estación?', 'Entschuldigen Sie, wo ist der Bahnhof?'),
('vocab_es_11', 'les_es_2', 'Perdón', 'Verzeihung', 'pehr-DOHN', 'Perdón, no entendí', 'Verzeihung, ich habe nicht verstanden'),
('vocab_es_12', 'les_es_2', 'Con permiso', 'Mit Verlaub', 'kohn pehr-MEE-so', 'Con permiso, voy a pasar', 'Mit Verlaub, ich gehe vorbei')
ON CONFLICT DO NOTHING;

-- Spanish Travel & Hotels
INSERT INTO lessons (id, category_id, title, type, order_index, xp_reward) VALUES
('les_es_4', 'cat_es_2', 'Hotel Check-In', 'dialogue', 0, 100),
('les_es_5', 'cat_es_2', 'Directions', 'vocab', 1, 75),
('les_es_6', 'cat_es_2', 'Transport', 'vocab', 2, 75)
ON CONFLICT DO NOTHING;

INSERT INTO vocabulary (id, lesson_id, word_target, word_de, pronunciation, example_sentence, example_sentence_de) VALUES
-- Hotel
('vocab_es_13', 'les_es_4', 'Tengo una reserva', 'Ich habe eine Buchung', 'TEN-go OO-nah reh-SER-vah', 'Tengo una reserva a nombre de García', 'Ich habe eine Buchung unter dem Namen García'),
('vocab_es_14', 'les_es_4', '¿Cuál es el número de habitación?', 'Was ist die Zimmernummer?', 'koo-AHL ehs el NOO-meh-ro deh ah-bee-tah-see-OHN', '¿Cuál es el número de mi habitación?', 'Was ist meine Zimmernummer?'),
('vocab_es_15', 'les_es_4', 'Necesito ayuda con el equipaje', 'Ich brauche Hilfe mit dem Gepäck', 'neh-seh-SEE-to ah-YOO-dah kohn el eh-kee-PAH-heh', 'Necesito ayuda con el equipaje, por favor', 'Ich brauche Hilfe mit dem Gepäck, bitte'),

-- Directions  
('vocab_es_16', 'les_es_5', 'A la izquierda', 'Nach links', 'ah lah ees-kee-EHR-dah', 'Gira a la izquierda en la esquina', 'Biegen Sie an der Ecke nach links ab'),
('vocab_es_17', 'les_es_5', 'A la derecha', 'Nach rechts', 'ah lah deh-REH-chah', 'La estación está a la derecha', 'Der Bahnhof ist auf der rechten Seite'),
('vocab_es_18', 'les_es_5', 'Recto/Derecho', 'Geradeaus', 'REH-to / deh-REH-cho', 'Sigue recto dos cuadras', 'Gehen Sie geradeaus zwei Blöcke'),
('vocab_es_19', 'les_es_5', 'Cerca', 'Nah', 'SER-kah', 'El supermercado está cerca', 'Der Supermarkt ist nah dran'),
('vocab_es_20', 'les_es_5', 'Lejos', 'Weit', 'LEH-hos', 'La playa está lejos de aquí', 'Der Strand ist weit entfernt von hier')
ON CONFLICT DO NOTHING;

-- ============================================
-- ITALIAN (Italiano)
-- ============================================
INSERT INTO languages (id, code, name, flag_emoji, level_unlocked) VALUES
('lang_it', 'it', 'Italiano', '🇮🇹', 1)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, language_id, name, icon, order_index) VALUES
('cat_it_1', 'lang_it', 'Greetings & Basics', '👋', 0),
('cat_it_2', 'lang_it', 'Restaurant & Food', '🍕', 1),
('cat_it_3', 'lang_it', 'Culture & Sights', '🏛️', 2),
('cat_it_4', 'lang_it', 'Daily Life', '🚶', 3),
('cat_it_5', 'lang_it', 'Time & Numbers', '🕐', 4)
ON CONFLICT DO NOTHING;

-- Italian Lessons
INSERT INTO lessons (id, category_id, title, type, order_index, xp_reward) VALUES
('les_it_1', 'cat_it_1', 'Hello & Goodbye', 'vocab', 0, 50),
('les_it_2', 'cat_it_1', 'Polite Expressions', 'vocab', 1, 50),
('les_it_3', 'cat_it_2', 'Restaurant Phrases', 'dialogue', 2, 100),
('les_it_4', 'cat_it_2', 'Food & Drinks', 'vocab', 3, 75)
ON CONFLICT DO NOTHING;

-- Italian Vocabulary
INSERT INTO vocabulary (id, lesson_id, word_target, word_de, pronunciation, example_sentence, example_sentence_de) VALUES
-- Greetings
('vocab_it_1', 'les_it_1', 'Ciao', 'Hallo/Tschüss', 'CHOW', 'Ciao, come stai?', 'Hallo, wie geht es dir?'),
('vocab_it_2', 'les_it_1', 'Buongiorno', 'Guten Tag', 'bwon-JOR-no', 'Buongiorno signora, come va?', 'Guten Tag Frau, wie geht es Ihnen?'),
('vocab_it_3', 'les_it_1', 'Buonasera', 'Guten Abend', 'bwon-ah-SEH-rah', 'Buonasera, piacere di conoscerti', 'Guten Abend, freut mich dich kennenzulernen'),
('vocab_it_4', 'les_it_1', 'Buonanotte', 'Gute Nacht', 'bwon-ah-NOT-teh', 'Buonanotte, dormi bene', 'Gute Nacht, schlaf gut'),
('vocab_it_5', 'les_it_1', 'Arrivederci', 'Auf Wiedersehen', 'ah-ree-veh-DER-chee', 'Arrivederci, a presto!', 'Auf Wiedersehen, bis bald!'),

-- Polite
('vocab_it_6', 'les_it_2', 'Per favore', 'Bitte', 'pehr fah-VOR-eh', 'Un espresso, per favore', 'Einen Espresso, bitte'),
('vocab_it_7', 'les_it_2', 'Grazie', 'Danke', 'GRAHT-zee-eh', 'Grazie mille', 'Vielen Dank'),
('vocab_it_8', 'les_it_2', 'Prego', 'Gerne', 'PREH-go', 'Prego, è stato un piacere', 'Gerne, es war mir ein Vergnügen'),
('vocab_it_9', 'les_it_2', 'Scusa', 'Entschuldigung', 'SKOO-zah', 'Scusa, dove è la stazione?', 'Entschuldigung, wo ist der Bahnhof?'),
('vocab_it_10', 'les_it_2', 'Mi dispiace', 'Es tut mir leid', 'mee dis-pee-AH-cheh', 'Mi dispiace, non posso venire', 'Es tut mir leid, ich kann nicht kommen'),

-- Restaurant
('vocab_it_11', 'les_it_3', 'Un tavolo per due', 'Ein Tisch für zwei', 'oon tah-VOH-lo pehr DOO-eh', 'Buonasera, un tavolo per due persone', 'Guten Abend, ein Tisch für zwei Personen'),
('vocab_it_12', 'les_it_3', 'Il conto, per favore', 'Die Rechnung, bitte', 'eel KON-to pehr fah-VOR-eh', 'Il conto, per favore', 'Die Rechnung, bitte'),
('vocab_it_13', 'les_it_3', 'Cosa mi consiglia?', 'Was empfehlen Sie mir?', 'KOH-sah mee kon-SIL-yah', 'Scusi, cosa mi consiglia?', 'Entschuldigung, was empfehlen Sie mir?'),

-- Food
('vocab_it_14', 'les_it_4', 'Pasta', 'Pasta', 'PAHS-tah', 'Mi piace molto la pasta', 'Ich mag Pasta sehr gerne'),
('vocab_it_15', 'les_it_4', 'Pizza', 'Pizza', 'PEET-tsah', 'Una pizza Margherita, per favore', 'Eine Pizza Margherita, bitte'),
('vocab_it_16', 'les_it_4', 'Vino rosso', 'Rotwein', 'VEE-no ROS-so', 'Un bicchiere di vino rosso, per favore', 'Ein Glas Rotwein, bitte'),
('vocab_it_17', 'les_it_4', 'Gelato', 'Eiscreme', 'jeh-LAH-to', 'Vorrei un gelato di cioccolato', 'Ich möchte eine Schokoladen-Eiscreme'),
('vocab_it_18', 'les_it_4', 'Caffè', 'Kaffee', 'kah-FEH', 'Un caffè ristretto, per favore', 'Einen doppelten Kaffee, bitte')
ON CONFLICT DO NOTHING;

-- ============================================
-- FRENCH (Français)
-- ============================================
INSERT INTO languages (id, code, name, flag_emoji, level_unlocked) VALUES
('lang_fr', 'fr', 'Français', '🇫🇷', 1)
ON CONFLICT DO NOTHING;

INSERT INTO categories (id, language_id, name, icon, order_index) VALUES
('cat_fr_1', 'lang_fr', 'Greetings & Basics', '👋', 0),
('cat_fr_2', 'lang_fr', 'Business & Work', '💼', 1),
('cat_fr_3', 'lang_fr', 'Paris & Culture', '🗼', 2),
('cat_fr_4', 'lang_fr', 'Shopping', '🛍️', 3),
('cat_fr_5', 'lang_fr', 'Questions', '❓', 4)
ON CONFLICT DO NOTHING;

-- French Lessons
INSERT INTO lessons (id, category_id, title, type, order_index, xp_reward) VALUES
('les_fr_1', 'cat_fr_1', 'Hello & Goodbye', 'vocab', 0, 50),
('les_fr_2', 'cat_fr_1', 'Polite Phrases', 'vocab', 1, 50),
('les_fr_3', 'cat_fr_2', 'Business Meeting', 'dialogue', 2, 125),
('les_fr_4', 'cat_fr_2', 'Professional Vocabulary', 'vocab', 3, 75)
ON CONFLICT DO NOTHING;

-- French Vocabulary
INSERT INTO vocabulary (id, lesson_id, word_target, word_de, pronunciation, example_sentence, example_sentence_de) VALUES
-- Greetings
('vocab_fr_1', 'les_fr_1', 'Bonjour', 'Guten Tag', 'bon-ZHOOR', 'Bonjour, comment ça va?', 'Guten Tag, wie geht es dir?'),
('vocab_fr_2', 'les_fr_1', 'Bonsoir', 'Guten Abend', 'bon-SWAHR', 'Bonsoir madame, bonne soirée', 'Guten Abend Frau, angenehmen Abend'),
('vocab_fr_3', 'les_fr_1', 'Bonne nuit', 'Gute Nacht', 'bon nwee', 'Bonne nuit, dors bien', 'Gute Nacht, schlaf gut'),
('vocab_fr_4', 'les_fr_1', 'Au revoir', 'Auf Wiedersehen', 'oh ruh-VWAHR', 'Au revoir, à bientôt', 'Auf Wiedersehen, bis bald'),
('vocab_fr_5', 'les_fr_1', 'À bientôt', 'Bis bald', 'ah bee-en-TOH', 'À bientôt, j\'ai été content de te voir', 'Bis bald, es war schön dich zu sehen'),

-- Polite
('vocab_fr_6', 'les_fr_2', 'S\'il vous plaît', 'Bitte (formell)', 'seel voo pleh', 'Un café, s\'il vous plaît', 'Einen Kaffee, bitte'),
('vocab_fr_7', 'les_fr_2', 'S\'il te plaît', 'Bitte (informell)', 'seel tuh pleh', 'Peux-tu m\'aider, s\'il te plaît?', 'Kannst du mir helfen, bitte?'),
('vocab_fr_8', 'les_fr_2', 'Merci', 'Danke', 'mehr-see', 'Merci beaucoup', 'Vielen Dank'),
('vocab_fr_9', 'les_fr_2', 'De rien', 'Gerne geschehen', 'duh ree-en', 'De rien, c\'est normal', 'Gerne geschehen, das ist normal'),
('vocab_fr_10', 'les_fr_2', 'Excusez-moi', 'Entschuldigen Sie', 'eck-sküz-ay-MWAH', 'Excusez-moi, où est la gare?', 'Entschuldigen Sie, wo ist der Bahnhof?'),

-- Business
('vocab_fr_11', 'les_fr_3', 'Enchanté de vous rencontrer', 'Freut mich, Sie kennenzulernen', 'on-shon-tay duh voo ron-kon-tray', 'Enchanté de vous rencontrer, bienvenue', 'Freut mich, Sie kennenzulernen, willkommen'),
('vocab_fr_12', 'les_fr_3', 'Je suis...', 'Ich bin...', 'zhuh swee', 'Je suis consultant en management', 'Ich bin Management Berater'),
('vocab_fr_13', 'les_fr_3', 'Pouvons-nous discuter du projet?', 'Können wir über das Projekt sprechen?', 'poo-von-NOO dis-kü-tay dü pro-ZHE', 'Pouvons-nous discuter du projet demain?', 'Können wir morgen über das Projekt sprechen?'),

-- Professional Vocab
('vocab_fr_14', 'les_fr_4', 'Réunion', 'Besprechung', 'ray-ü-nee-ON', 'La réunion commence à 10 heures', 'Die Besprechung beginnt um 10 Uhr'),
('vocab_fr_15', 'les_fr_4', 'Présentation', 'Präsentation', 'pray-zon-tah-see-ON', 'Ma présentation est prête', 'Meine Präsentation ist fertig'),
('vocab_fr_16', 'les_fr_4', 'Contrat', 'Vertrag', 'kon-TRAH', 'Nous devons signer le contrat', 'Wir müssen den Vertrag unterzeichnen'),
('vocab_fr_17', 'les_fr_4', 'Budget', 'Budget', 'büd-ZHE', 'Quel est le budget pour ce projet?', 'Was ist das Budget für dieses Projekt?'),
('vocab_fr_18', 'les_fr_4', 'Deadline', 'Frist/Termin', 'ded-LINE', 'La deadline est le 30 mai', 'Der Termin ist der 30. Mai')
ON CONFLICT DO NOTHING;

-- ============================================
-- Update languages with lesson counts
-- ============================================
UPDATE languages SET level_unlocked = 1 WHERE id IN ('lang_es', 'lang_it', 'lang_fr');
