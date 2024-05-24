// script.js
function calculateGenetics() {
    const inheritanceType = document.getElementById('inheritanceType').value;
    const geneInfo = document.getElementById('geneInfo').value.trim();

    if (geneInfo === "") {
        document.getElementById('resultText').innerText = "請輸入基因信息";
        return;
    }

    let resultText = "";

    if (inheritanceType === "single") {
        resultText = calculateSingleGene(geneInfo);
    }
    else if (inheritanceType === "multiple")
    {
        resultText = "付費開啟!";
    }

    document.getElementById('resultText').innerHTML = resultText;
}

function calculateSingleGene(geneInfo) {
    const genes = geneInfo.split(' ');
    if (genes.length !== 2) {
        return "請輸入正確的基因格式，例如：A-a A-a 或 I_A-I_B I_B-i";
    }

    const [parent1, parent2] = genes.map(gene => gene.split('-'));
    const genotypes = getGenotypes(parent1, parent2);
    const phenotypeCounts = getPhenotypeCounts(genotypes);
    const genotypeCounts = getGenotypeCounts(genotypes);

    let genotypeResult = "基因型：";
    let phenotypeResult = "表現型：";

    for (const [genotype, count] of Object.entries(genotypeCounts)) {
        const probability = (count / 4).toFixed(2);
        genotypeResult += `(${probability})${formatGenotype(genotype)}、`;
    }
    genotypeResult = genotypeResult.slice(0, -1); // 去掉最後一個逗號

    for (const [phenotype, count] of Object.entries(phenotypeCounts)) {
        const probability = (count / 4).toFixed(2);
        phenotypeResult += `(${probability})"${formatPhenotype(phenotype)}"、`;
    }
    phenotypeResult = phenotypeResult.slice(0, -1); // 去掉最後一個逗號

    return `${genotypeResult}<br>${phenotypeResult}`;
}

function getGenotypes(parent1, parent2) {
    const genotypes = [];
    for (const allele1 of parent1) {
        for (const allele2 of parent2) {
            genotypes.push([allele1, allele2].sort().join(''));
        }
    }
    return genotypes;
}

function getPhenotypeCounts(genotypes) {
    const phenotypeCounts = {};
    for (const genotype of genotypes) {
        const phenotype = getPhenotype(genotype);
        phenotypeCounts[phenotype] = (phenotypeCounts[phenotype] || 0) + 1;
    }
    return phenotypeCounts;
}

function getPhenotype(genotype) {
    if (genotype.includes('_')) {
        const alleles = genotype.split('_');
        const dominantAlleles = [];
        const recessiveAlleles = [];
        for (const allele of alleles) {
            const [firstLetter, secondLetter] = allele.split('');
            if (firstLetter.toUpperCase() === firstLetter) {
                dominantAlleles.push(firstLetter + (secondLetter ? `<sup>${secondLetter}</sup>` : ''));
            } else {
                recessiveAlleles.push(firstLetter);
            }
        }

        let phenotype = '';
        let dominant_or_recessive = "隱性";
        if (dominantAlleles.length > 0) {
            phenotype += dominantAlleles.join('');
            dominant_or_recessive = "顯性";
        }
        if (recessiveAlleles.length > 0) {
            phenotype += ` ${recessiveAlleles.join('')}`;
        }
        // return `${phenotype}-${dominant_or_recessive}`;
        return "付費解鎖";
    }

    const dominantAllele = genotype[0].toUpperCase();
    const recessiveAllele = genotype[1].toLowerCase();

    if (genotype[0] === genotype[0].toUpperCase()) {
        return `${dominantAllele}-顯性`;
    }
    return `${recessiveAllele}-隱性`;
}




function getGenotypeCounts(genotypes) {
    const genotypeCounts = {};
    for (const genotype of genotypes) {
        genotypeCounts[genotype] = (genotypeCounts[genotype] || 0) + 1;
    }
    return genotypeCounts;
}

function formatGenotype(genotype) {
    return genotype.replace(/_(.)/g, '<sup>$1</sup>');
}

function formatPhenotype(phenotype) {
    return phenotype.replace(/_(.)/g, '<sup>$1</sup>');
}
