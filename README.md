# MERN-Stack Infrastructure

Clone this repo to provide the starter code for a comprehensive MERN-Stack project including token-based authentication.


selected item -> forEach(mods)(or whatever) -> if tags array of item contains a spawn weight.tag from mods, add mod to array of potential mods

potential mods - show weight (from spawn_eights) and stats (from stats array) and implicit tags(from implicit_tags array)

todo :

filter mods list to only include prefixes suffixes and implicits

split mod categories into prefixes and suffixes, then split mods in to the categories

%#%%#%#%# Main issue right now is in the filter for setShortModsList - fix this first or find a different way to do it.


a filter alternative by gpt3:


let activeMods = Object.values(modsList).filter(mod => {
  return mod.spawn_weights.some(weight => {
    return (
      activeTags.includes(weight.tag) &&
      weight.weight > 0 &&
      mod.domain === "item" &&
      ["suffix", "prefix", "implicit"].includes(mod.generation_type)
    );
  });
});

let modTypes = Array.from(new Set(activeMods.map(mod => mod.type)));
setActiveItemModTypes(modTypes);
console.log("active Mods", activeMods);
console.log("modTypes", modTypes);