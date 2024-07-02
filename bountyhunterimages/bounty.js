// List of image filenames
const images = ['Backer_humanfemale_grahamwilliams_tsilonsiereht.png',
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

const crimes = [
        'murder',
        'kidnapping',
        'drug-running',
        'smuggling',
        'organized crime',
        'cybercrime'
];

// Path to the images folder
const imageFolder = 'dm_portraits/';

// Function to select a random image
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

// Function to display the random image
function displayRandomImage() {
    for ( let iImage = 1 ; iImage<=4 ; iImage++ ) { 
        const randomImage = getRandomImage();
        const imageElement = document.getElementById('randomImage'+iImage);
        imageElement.src = imageFolder + randomImage;
        
        const bioElement = document.getElementById('bio'+iImage);
        
        const randomIndex = Math.floor(Math.random() * crimes.length);
        bioElement.innerHTML = "Wanted for "+crimes[randomIndex]+"<br><br>"+
            "Warning: cybernetic enhancements!<br><br>"+
            "Reward:</br>"+Math.floor(Math.random()*999)+",000 cr";


    }
}

// Display a random image on page load
window.onload = displayRandomImage;