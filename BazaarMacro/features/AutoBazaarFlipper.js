import Config from "../config";

// AutoBazaarFlipper.js

// Configuration
const TARGET_SLOT = { row: 5, column: 5 }; // Confirm button position
const CHECK_INTERVAL = 3000; // 3 seconds between checks
let isProcessing = false;

// Convert row/column to slot number
function getSlot(row, col) {
    return row * 9 + col;
}

// Check if offer is 100% filled
function isOfferFilled(gui) {
    const slot = gui.getSlotUnderMouse();
    if (!slot) return false;

    const lore = slot.getItem()?.getLore();
    return lore?.some(line => line.includes("100%")) || false;
}

// Main processing function
function processFilledOffers() {
    if (isProcessing) return;
    isProcessing = true;
try {
        const gui = Client.getMinecraft().field_71439_g.field_71070_bA;
        if (!gui || !gui.func_146388_f().func_150254_d().includes("Bazaar")) return;

        // Check all visible offer slots
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 9; col++) {
                const slot = getSlot(row, col);
                const item = gui.func_75139_a(slot)?.func_82833_r();

                if (item && item.includes("Carrot") && isOfferFilled(gui)) {
                    clickConfirmOffer();
                    ChatLib.chat(§aProcessed filled ${item} offer!);
                    return;
                }
            }
        }
    } catch (e) {
        ChatLib.chat(§cError: ${e});
    } finally {
        isProcessing = false;
    }
}

function clickConfirmOffer() {
    const confirmSlot = getSlot(TARGET_SLOT.row, TARGET_SLOT.column);
    const clickPacket = new Packages.net.minecraft.network.play.client.C0EPacketClickWindow(
        Client.getMinecraft().field_71439_g.field_71070_bA.field_75152_c,
        confirmSlot,
        0, 0, null, 0
    );

    Client.getMinecraft().field_71439_g.field_71174_a.func_147297_a(clickPacket);
}

// Open Bazaar and start checking
function startProcess() {
    Client.getMinecraft().func_147121_ag(); // Right click
    register('guiOpened', () => {
        setTimeout(processFilledOffers, 500);
    });
}

// Command to trigger
register('command', () => {
    startProcess();
}).setName('autosell');

// Automatic check every 3 seconds
register('step', () => {
    if (Date.now() % CHECK_INTERVAL === 0) {
        processFilledOffers();
    }
}).setFps(20);
