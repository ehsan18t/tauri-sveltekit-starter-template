mod commands;
mod error;
mod setup;
mod state;

use state::AppState;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState(Default::default()))
        .setup(setup::setup)
        .invoke_handler(tauri::generate_handler![
            commands::general::greet,
            commands::general::get_greetings,
            commands::general::clear_greetings,
            commands::general::update_theme,
            commands::general::get_theme,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
