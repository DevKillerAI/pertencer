-- MIGRAÇÃO PARA A PLATAFORMA POME

-- 1. Alterações na tabela de Usuários (users)
-- Adiciona a coluna de e-mail se ela não existir
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;

-- 2. Alterações na tabela de Ocorrências (occurrences)
-- Adiciona a coluna de status (rascunho ou finalizado)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'rascunho';

-- Adiciona a coluna de Componente Curricular (subject_matter)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS subject_matter TEXT;

-- Adiciona a coluna de pessoas atendidas como um array de objetos JSONB
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS attended_people JSONB DEFAULT '[]'::jsonb;

-- Adiciona a coluna para múltiplas classificações de ocorrência como JSONB
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS classifications JSONB DEFAULT '[]'::jsonb;

-- 3. Atualizar dados existentes no banco (opcional para retrocompatibilidade)
-- Preenche as colunas de quem já existe para não quebrar o layout
UPDATE occurrences 
SET attended_people = json_build_array(
    json_build_object(
        'name', COALESCE("guardianName", 'Não informado'),
        'bond', 'Responsável',
        'contact', COALESCE("contacts", 'Não informado')
    )
)
WHERE attended_people IS NULL OR attended_people = '[]'::jsonb;

UPDATE occurrences 
SET classifications = json_build_array(type)
WHERE classifications IS NULL OR classifications = '[]'::jsonb;
