-- MIGRAÇÃO PARA A PLATAFORMA POME (ATUALIZADA)

-- 1. Alterações na tabela de Usuários (users)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS lgpd_accepted BOOLEAN DEFAULT true;

-- 2. Alterações na tabela de Ocorrências (occurrences)
-- Status da ocorrência (rascunho ou finalizado)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'rascunho';

-- Componente Curricular (subject_matter)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS subject_matter TEXT;

-- Pessoas atendidas (responsáveis)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS attended_people JSONB DEFAULT '[]'::jsonb;

-- Múltiplos estudantes vinculados ao atendimento
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS students JSONB DEFAULT '[]'::jsonb;

-- Classificações da ocorrência (Natureza / Dimensão / Termo)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS classifications JSONB DEFAULT '[]'::jsonb;

-- Sentimentos identificados durante o atendimento (CNV)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS feelings JSONB DEFAULT '[]'::jsonb;
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS feelings_observations TEXT;

-- Encaminhamentos para Direção / Rede de Proteção (Conselho Tutelar, UBS/CAPS, CRAS/CREAS, etc.)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS direction_referrals JSONB DEFAULT '[]'::jsonb;

-- Trilha de auditoria (metadados de alteração)
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS "updatedAt" TEXT;
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS "updatedById" TEXT;
ALTER TABLE occurrences ADD COLUMN IF NOT EXISTS "updatedByName" TEXT;

-- 3. Atualizar dados existentes no banco para retrocompatibilidade
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
SET students = json_build_array(
    json_build_object(
        'studentName', COALESCE("studentName", 'Não informado'),
        'sex', 'Não informado',
        'turn', 'Não informado',
        'gradeCycle', COALESCE("gradeCycle", 'Não informado'),
        'className', COALESCE("className", 'Não informado'),
        'teacherName', COALESCE("teacherName", 'Não informado'),
        'subject_matter', COALESCE("subject_matter", 'Não informado'),
        'guardian', json_build_object(
            'name', COALESCE("guardianName", 'Não informado'),
            'bond', 'Responsável',
            'contact', COALESCE("contacts", 'Não informado')
        )
    )
)
WHERE students IS NULL OR students = '[]'::jsonb;

UPDATE occurrences 
SET classifications = json_build_array(type)
WHERE classifications IS NULL OR classifications = '[]'::jsonb;

