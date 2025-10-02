/**
 * Parses a raw stat string from the game's data files into a structured format.
 * @param {string | null} statsStr - The raw string containing one or more stat bonuses.
 * @returns {Array<Object>} An array of structured stat objects.
 */
function parseStats(statsStr) {
    if (!statsStr) {
        return [];
    }

    const processedStats = [];
    const lines = statsStr.split('\n');
    const valueRegex = /([+-])\s*(\d+\.?\d*)\s*(%?)/;

    for (const originalLine of lines) {
        if (!originalLine.trim()) continue;

        if (originalLine.includes(':')) {
            const parts = originalLine.split(':');
            const statName = parts[0].replace(/<[^>]*>/g, '').trim();
            let valuesStr = parts.slice(1).join(':').replace(/<[^>]*>/g, '').trim();

            const perLevelRegex = /([+-]\s*\d+\.?\d*%?)\s*per level/i;
            const perLevelMatch = valuesStr.match(perLevelRegex);

            let perLevelPart = null;
            let basePart = valuesStr;

            if (perLevelMatch) {
                perLevelPart = perLevelMatch[1].replace(/\s/g, '');
                basePart = valuesStr.replace(perLevelMatch[0], '').trim();
            }

            const baseValueMatch = basePart.match(valueRegex);
            const perLevelValueMatch = perLevelPart ? perLevelPart.match(valueRegex) : null;

            if (baseValueMatch || perLevelValueMatch) {
                let finalValue = 0;
                let finalPerLevel = 0;
                let isPercentage = false;

                if (baseValueMatch) {
                    const baseSign = baseValueMatch[1] === '+' ? 1 : -1;
                    const baseValue = parseFloat(baseValueMatch[2]);
                    isPercentage = baseValueMatch[3] === '%';
                    finalValue = baseValue * baseSign;
                }

                if (perLevelValueMatch) {
                    const perLevelSign = perLevelValueMatch[1] === '+' ? 1 : -1;
                    const perLevelValue = parseFloat(perLevelValueMatch[2]);
                    if (!isPercentage) {
                        isPercentage = perLevelValueMatch[3] === '%';
                    }
                    finalPerLevel = perLevelValue * perLevelSign;
                }

                if (statName === 'All Stats') {
                    ['STR', 'AGI', 'VIT', 'INT', 'DEX', 'LUK'].forEach(s => {
                        processedStats.push({
                            stat: s,
                            value: finalValue,
                            perLevel: finalPerLevel,
                            isPercentage: isPercentage,
                        });
                    });
                } else {
                    processedStats.push({
                        stat: statName,
                        value: finalValue,
                        perLevel: finalPerLevel,
                        isPercentage: isPercentage,
                    });
                }
                continue;
            }
        }

        const cleanedLine = originalLine.replace(/<[^>]*>/g, ' ').replace(/\s\s+/g, ' ').trim();
        if (cleanedLine) {
            processedStats.push({
                stat: 'Special',
                description: cleanedLine,
            });
        }
    }

    return processedStats;
}


/**
 * Processes the raw equipment data to add a machine-readable 'ProcessedStats' property.
 * @param {Array<Object>} equipmentData - The raw equipment data from Equipment.json.
 * @returns {Array<Object>} The processed equipment data.
 */
function processEquipmentData(data) {
    return data.map(item => {
        const primary = parseStats(item.PrimaryStats);
        const secondary = parseStats(item.SecondaryStats);
        const setBonuses = parseStats(item.SetBonuses);
        item.ProcessedStats = {
            primary,
            secondary,
            setBonuses
        };
        return item;
    });
}

/**
 * Processes the raw card data to add a machine-readable 'ProcessedStats' property.
 * @param {Array<Object>} cardData - The raw card data from Cards.json.
 * @returns {Array<Object>} The processed card data.
 */
function processCardsData(data) {
    return data.map(card => {
        card.ProcessedStats = parseStats(card.Stats);
        return card;
    });
}

function processAllData() {
    if (typeof window.equipmentData !== 'undefined' && Array.isArray(window.equipmentData)) {
        window.equipmentData = processEquipmentData(window.equipmentData);
    }
    if (typeof window.cardData !== 'undefined' && Array.isArray(window.cardData)) {
        window.cardData = processCardsData(window.cardData);
    }
}