// List of image filenames
const imageList = ['Backer_humanfemale_grahamwilliams_tsilonsiereht.png',
                'Backer_humanfemale_saracastle_drsaracastle_tribute.png',
                'Backer_humanfemale_wren.png',
                'Backer_humanmale_adamdoochin_elduce.png',
                'Backer_humanmale_alexeykruglyakov.png',
                'Backer_humanmale_alnur.png',
                'Backer_humanmale_andresguillermoaguirre.png',
                'Backer_humanmale_chrisvangraas.png',
                'Backer_humanmale_dennisjandt.png',
                'Backer_humanmale_dennisjandt_cochise.png',
                'Backer_humanmale_evanjameshawco.png',
                'Backer_humanmale_gregwilhelm_johnnyclean_tribute.png',
                'Backer_humanmale_jameshicklin_justincase.png',
                'Backer_humanmale_jamestbenton.png',
                'Backer_humanmale_janradersheidt.png',
                'Backer_humanmale_jasonlagan.png',
                'Backer_humanmale_joecostantino.png',
                'Backer_humanmale_johnholmes.png',
                'Backer_humanmale_johnmaloney_johnnymaloney.png',
                'Backer_humanmale_jonathanbartlett_jonbartlett_tribute.png',
                'Backer_humanmale_levieranburks.png',
                'Backer_humanmale_markkalinic.png',
                'Backer_humanmale_nikpoenisch.png',
                'Backer_humanmale_randynickel_snick.png',
                'Backer_humanmale_rc.png',
                'Backer_humanmale_rc_greymitigator.png',
                'Backer_humanmale_richgallup.png',
                'Backer_humanmale_robertbowling.png',
                'Backer_humanmale_robertorivera_diamondwire.png',
                'Backer_humanmale_robertorivera_diamondwirealt.png',
                'Backer_humanmale_shanetilton.png',
                'Backer_humanmale_stevejackson_evilstevie.png',
                'Backer_humanmale_thaddeusryker.png',
                'Backer_humanmale_winterhawk_dralastairstone.png',
                'Backerpc_humanfemale_luckystrike.png',
                'Backerpc_humanmale_adamdoochin_stephenwatashima.png',
                'Backerpc_humanmale_andresguillermoaguirre.png',
                'Backerpc_humanmale_davidfry_joshuamorgan.png',
                'Backerpc_humanmale_ericdahlman_alnur.png',
                'Backerpc_humanmale_jamesherbert_okanodaemontamashiro.png',
                'Backerpc_humanmale_joshuarlawford_rayquandary.png',
                'Backerpc_humanmale_matthewpalsson_ashtonwoods.png',
                'Backerpc_humanmale_rc_greymitigator.png',
                'Backerpc_humanmale_robertbowling_dashyoung.png',
                'Generic_humanmale_courier.png',
                'Generic_humanmale_knighterrant.png',
                'Generic_humanmale_lonestarguard01.png',
                'Generic_humanmale_rent-a-cop.png',
                'Generic_humanmale_scientist01.png',
                'Generic_humanmale_urbanpoor01.png',
                'Npc_humanfemale_alice.png',
                'Npc_humanfemale_alicesim.png',
                'Npc_humanfemale_feuerschwinge.png',
                'Npc_humanfemale_glory.png',
                'Npc_humanfemale_goldfish.png',
                'Npc_humanfemale_kami.png',
                'Npc_humanfemale_militiacaptain.png',
                'Npc_humanfemale_monika.png',
                'Npc_humanfemale_monikaapex.png',
                'Npc_humanfemale_monikadying.png',
                'Npc_humanfemale_muller.png',
                'Npc_humanfemale_newsreporter2.png',
                'Npc_humanfemale_nixie.png',
                'Npc_humanfemale_silke.png',
                'Npc_humanfemale_simmy.png',
                'Npc_humanmale_alexander.png',
                'Npc_humanmale_alnur.png',
                'Npc_humanmale_altug.png',
                'Npc_humanmale_amsel.png',
                'Npc_humanmale_attacksurvivor.png',
                'Npc_humanmale_blister.png',
                'Npc_humanmale_blitz.png',
                'Npc_humanmale_bloodmage.png',
                'Npc_humanmale_clone.png',
                'Npc_humanmale_dietrich.png',
                'Npc_humanmale_frank.png',
                'Npc_humanmale_ghoulleader.png',
                'Npc_humanmale_gunari.png',
                'Npc_humanmale_heimerich.png',
                'Npc_humanmale_humanis.png',
                'Npc_humanmale_jan.png',
                'Npc_humanmale_lodgerep.png',
                'Npc_humanmale_maintenanceworker.png',
                'Npc_humanmale_mulvihill.png',
                'Npc_humanmale_newsreporter1.png',
                'Npc_humanmale_okano.png',
                'Npc_humanmale_parsons.png',
                'Npc_humanmale_quorin.png',
                'Npc_humanmale_vauclair.png',
                'Npc_humanmale_vauclair40.png',
                'Npc_humanmale_vauclair50.png',
                'Npc_humanmale_vauclairyoung.png',
                'Npc_humanmale_winters.png',
                'Npc_humanmale_winterstired.png',
                'Npc_humanmale_wintersyoung.png',
                'Pc_humanfemale_00_faceless.png',
                'Pc_humanfemale_01_shavedhead.png',
                'Pc_humanfemale_01a_shavedhead.png',
                'Pc_humanfemale_01b_shavedhead.png',
                'Pc_humanfemale_01c_shavedhead.png',
                'Pc_humanfemale_02_detective.png',
                'Pc_humanfemale_02a_detective.png',
                'Pc_humanfemale_02b_detective.png',
                'Pc_humanfemale_03_educated.png',
                'Pc_humanfemale_03a_educated.png',
                'Pc_humanfemale_04_whitebob.png',
                'Pc_humanfemale_04a_whitebob.png',
                'Pc_humanfemale_04b_whitebob.png',
                'Pc_humanfemale_04c_whitebob.png',
                'Pc_humanfemale_05_goth.png',
                'Pc_humanfemale_05a_goth.png',
                'Pc_humanfemale_06_pixie.png',
                'Pc_humanfemale_06a_pixie.png',
                'Pc_humanfemale_06c_pixie.png',
                'Pc_humanfemale_07_darkskin.png',
                'Pc_humanfemale_07b_darkskin.png',
                'Pc_humanfemale_07c_darkskin.png',
                'Pc_humanmale_00_faceless.png',
                'Pc_humanmale_01_roadwarrior.png',
                'Pc_humanmale_01a_roadwarrior.png',
                'Pc_humanmale_01b_roadwarrior.png',
                'Pc_humanmale_02_topknot.png',
                'Pc_humanmale_02a_topknot.png',
                'Pc_humanmale_02b_topknot.png',
                'Pc_humanmale_03_african.png',
                'Pc_humanmale_03a_african.png',
                'Pc_humanmale_03b_african.png',
                'Pc_humanmale_03c_african.png',
                'Pc_humanmale_04_brawler.png',
                'Pc_humanmale_04a_brawler.png',
                'Pc_humanmale_04b_brawler.png',
                'Pc_humanmale_04c_brawler.png',
                'Pc_humanmale_05_dreads.png',
                'Pc_humanmale_05a_dreads.png',
                'Pc_humanmale_05b_dreads.png',
                'Pc_humanmale_06_shavedhead.png',
                'Pc_humanmale_06a_shavedhead.png',
                'Pc_humanmale_07_danielmaddox.png',
                'Pc_humanmale_07a_danielmaddox.png',
                'Pc_humanmale_08_victorvergara.png',
                'Pc_humanmale_09_jarrodpowell.png',
    // Add more images as needed
];

const crimeList = [
        ['murder',1000000],
        ['kidnapping',500000],
        ['drug trafficking',1000000],
        ['smuggling',100000],
        ['extortion',100000],
        ['theft',100000],
        ['espionage',10000000],
        ['fraud',1000000],
        ['treason',20000000],
        ['assault',100000],
        ['hacking',100000],
        ['terrorism',10000000],
        ['forgery',50000],
        ['vandalism',10000],
        ['poaching',20000],
        ['illegal arms dealing',100000],
        ['bribery',5000],
        ['corruption',200000],
        ['desertion',5000],
];

// Path to the images folder
const imageFolder = 'dm_portraits/';

// Function to select a random image
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
}

function displayImage(iBounty,randomImage) {
    const imageElement = document.getElementById('randomImage'+iBounty);
    imageElement.src = imageFolder + randomImage;
}

function joinWithCommasAnd(array) {
    if (array.length === 0) {
        return '';
    } else if (array.length === 1) {
        return array[0];
    } else if (array.length === 2) {
        return array.join(' and ');
    } else {
        return array.slice(0, -1).join(', ') + ', and ' + array[array.length - 1];
    }
}

function generateRandomSyllable() {
    let syllable = ""
    const consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z'];
    const vowels = ['a','e','i','o','u','y'];

    if ( Math.random()>0.5 ) {
        const randomIndex = Math.floor(Math.random() * consonants.length);
        syllable+=consonants[randomIndex];
    }
    const randomIndex = Math.floor(Math.random() * vowels.length);
    syllable+=vowels[randomIndex];
    if ( Math.random()>0.5 ) {
        const randomIndex = Math.floor(Math.random() * consonants.length);
        syllable+=consonants[randomIndex];
    }
    return syllable;
}

function generateRandomName(imagePath) {
    // let sex;
    // if (imagePath.includes("female")) {
    //     sex = "f";
    // } else {
    //     sex = "m";
    // }
    // if ( sex == "f" ) {
    //     return "Alex";
    // } else {
    //     return "Steve";
    // }
    const nSyllables = Math.floor(Math.random()*4)+1;
    let randomName = ""
    for ( let iSyllable = 0 ; iSyllable<nSyllables ; iSyllable++ ) {
        randomName+=generateRandomSyllable();
    }
    return randomName;
}

function generateRandomFullName(imagePath) {
    return generateRandomName(imagePath)+" "+generateRandomName(imagePath);
}

const lineLength = 54;

function centerPad(text) {
    
    const beforePad = Math.ceil((lineLength-text.length)/2)-1;
    const afterPad = lineLength - beforePad - text.length - 1;
    console.log(beforePad,text.length,afterPad,beforePad+text.length+afterPad,lineLength);
    return "\xa0".repeat(beforePad)+text+"\xa0".repeat(afterPad);
    // return "-".repeat(beforePad)+text+"-".repeat(afterPad);
}

function starLine() {
    const repeats = Math.floor(lineLength/3);
    return "*\xa0\xa0".repeat(repeats);
}

function generateRandomBio(imageName) {
    let crimeIndices = [];
    let iCrime=0;
    while ( iCrime<5 ) {
        const randomIndex = Math.floor(Math.random() * crimeList.length);
        if (!crimeIndices.includes(randomIndex) ) {
            crimeIndices.push(randomIndex);
        }
        if (Math.random()>0.5) {
            break;
        }
        iCrime++;
    }

    let crimes = [];
    let rewards = [];
    let reward = 0.;
    for ( iCrime = 0 ; iCrime<crimeIndices.length ;iCrime++ ) {
        let crimeName = crimeList[crimeIndices[iCrime]][0];
        let crimeReward = Math.random()*crimeList[crimeIndices[iCrime]][1];
        const extremeCrime = Math.random()>0.9;
        if ( extremeCrime ) {
            crimeName = "multiple counts of "+crimeName;
            crimeReward*=(Math.random()+2)*5;
        }
        crimes.push(crimeName);
        rewards.push(crimeReward);

        reward+=rewards[iCrime];
    }

    let combined = crimes.map((crime, index) => {
        return { crime: crime, reward: rewards[index] };
    });
    
    // Sort the combined array based on the age property
    combined.sort((a, b) => a.reward - b.reward);
    
    // Extract the sorted values back into the original arrays
    crimes = combined.map(element => element.crime);
    
    reward = Math.floor(reward/50)*50;

    let age = Math.floor(Math.random()*50+20);

    let bountyName = generateRandomFullName(imageName);

    const crime = joinWithCommasAnd(crimes);
    let bioText = centerPad("|BOUNTY OFFERED|")+"<br>" +
            starLine()+"<br>"+
            bountyName+", "+age+"<br>"+
            "Wanted for "+crime+"<br><br>"+
            "Last seen in Mos Eisley Cantina<br><br>"+
            "Armed resistance anticipated<br><br>"+
            "Warning: cybernetic enhancements!<br>  "+
            starLine()+"<br>"+
            centerPad("|Reward:Cr"+reward.toLocaleString('en-US')+"|")+"<br>"
            ;

    bioText = bioText.toUpperCase();
    return bioText;
}

function displayBio(iBounty,text) {
    const bioElement = document.getElementById('bio'+iBounty);
    bioElement.innerHTML = text;
}

// Function to display the random image
function generateRandomBounties() {
    for ( let iBounty = 1 ; iBounty<=4 ; iBounty++ ) { 
        let randomImage = getRandomImage();
        displayImage(iBounty,randomImage);
        displayBio(iBounty,generateRandomBio(randomImage));
    }
}

// Display a random image on page load
window.onload = generateRandomBounties;