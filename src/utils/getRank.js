export default function(MMR) {
    let Result = "";
    if (MMR >= 0 && MMR < 800) {
        Result = 'Joker';
    } else if (MMR >= 800 && MMR < 1200) {
        Result = 'Peasant';
    } else if (MMR >= 1200 && MMR < 1400) {
        Result = 'Guard';
    } else if (MMR >= 1400 && MMR < 1600) {
        Result = 'Knight';
    } else if (MMR >= 1600 && MMR < 2000) {
        Result = 'MasterKnight';
    } else if (MMR >= 2000 && MMR < 2400) {
        Result = 'Lord';
    } else if (MMR >= 2400 && MMR < 3000) {
        Result = 'Duke';
    } else if (MMR >= 3000 && MMR < 3600) {
        Result = 'Prince';
    } else if (MMR >= 3600 && MMR < 4000) {
        Result = 'King';
    } else if (MMR >= 4000) {
        Result = 'Emperor';
    }
    return Result
}
