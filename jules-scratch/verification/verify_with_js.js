(function() {
    console.log("--- Starting JavaScript Verification ---");

    // Helper to set a value and trigger the input event
    function setValue(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.error(`Element with ID ${id} not found.`);
        }
    }

    // --- Set Player Stats ---
    setValue('p_lv', 100);
    setValue('p_str', 100);
    setValue('p_dex', 100);
    setValue('p_int', 100);
    setValue('p_agi', 100);
    setValue('p_luk', 100);
    setValue('p_vit', 100);
    setValue('p_weapon_atk', 100);
    setValue('p_weapon_matk', 100);
    setValue('p_atk', 10);
    setValue('p_matk', 10);
    setValue('p_mastery', 10);
    setValue('p_atk_perc', 10);
    setValue('p_matk_perc', 10);
    setValue('p_flat_def', 20);
    setValue('p_aspd_perc', 10);

    // --- Set Target Stats (Custom) ---
    // First, switch to custom to enable the fields
    document.getElementById('t_archetype').value = 'Custom';
    document.getElementById('t_archetype').dispatchEvent(new Event('change'));

    setValue('t_lv', 100);
    setValue('t_def', 100);
    setValue('t_mdef', 100);
    setValue('t_block', 10);
    setValue('t_vit_custom', 50);
    setValue('t_dex_custom', 50);
    setValue('t_critdef_custom', 5);
    setValue('t_def_perc', 10);
    setValue('t_mdef_perc', 10);
    setValue('t_reflect_perc', 20);

    // --- Trigger Calculation ---
    calculateAll();

    // --- Log Results ---
    console.log("--- Verification Results ---");
    const results = {
        final_atk: document.getElementById('r_atk').textContent,
        final_matk: document.getElementById('r_matk').textContent,
        aspd: document.getElementById('r_aspd').textContent,
        attack_delay: document.getElementById('r_atk_delay').textContent,
        phys_reduction: document.getElementById('r_phys_reduc').textContent,
        mag_reduction: document.getElementById('r_mag_reduc').textContent,
        reflected_damage: document.getElementById('r_reflect').textContent,
        final_target_def: document.getElementById('t_def').value,
        final_target_mdef: document.getElementById('t_mdef').value,
    };

    for (const [key, value] of Object.entries(results)) {
        console.log(`${key}: ${value}`);
    }
    console.log("--- End of JavaScript Verification ---");
})();