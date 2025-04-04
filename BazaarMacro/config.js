import { @NumberProperty, @ButtonProperty, @SelectorProperty, @SliderProperty, @SwitchProperty, @TextProperty, @Vigilant } from "Vigilance";

@Vigilant("BazaarMacro", "BazaarMacro", {
    getCategoryConparator: () => (a,b) => {
        const categirues = ["General", "Macro", "More?!??!??"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Config {
    //General
    @SwitchProperty({
        name: "Main Toggle",
        description: "Toggles module on and off. \n┌∩┐(◣_◢)┌∩┐",
        category: "General",
        subcategory: "",
    })
    toggleModule = true;

    // MACRO

    @SwitchProperty({
        name: "Click NPC",
        description: "if you don't have cookie make it right click to open bazaar using npc instead.",
        category: "Macro",
        subcategory: "",
    })
    cookieActive = true;

    // More?!??!??

    @SwitchProperty({
        name: "this is where more will go!",
        description: "blah blah blah",
        category: "More?!??!??",
        subcategory: "",
    })
    toggleToggle = true;
}

export default new Config();