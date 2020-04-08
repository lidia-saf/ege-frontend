const sectionTranspiler: ISectionTranspiler = {
    'reading': 'Чтение',
    'listening': 'Аудирование',
    'speaking': 'Говорение',
    'grammar': 'Грамматика и лексика',
    'writing': 'Письмо'
}

interface ISectionTranspiler {
    [x: string]: string;
}

export { sectionTranspiler };
