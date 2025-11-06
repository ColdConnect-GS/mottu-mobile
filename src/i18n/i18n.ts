import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  pt: {
    profile: "Perfil",
    changePhoto: "Alterar foto",
    name: "Nome",
    email: "Email",
    logout: "Sair",
    logoutConfirm: "Você realmente deseja sair?",
    cancel: "Cancelar",
    loading: "Carregando perfil...",
    changeLanguage: "Trocar idioma",
  },
  es: {
    profile: "Perfil",
    changePhoto: "Cambiar foto",
    name: "Nombre",
    email: "Correo electrónico",
    logout: "Cerrar sesión",
    logoutConfirm: "¿Realmente deseas salir?",
    cancel: "Cancelar",
    loading: "Cargando perfil...",
    changeLanguage: "Cambiar idioma",
  },
});

// ✅ Pega o locale com fallback seguro
const locale = Localization.locale || "pt-BR";

// Define o idioma base (primeiros 2 caracteres, ex: "pt", "es")
i18n.locale = locale.slice(0, 2) === "es" ? "es" : "pt";

// Ativa fallback para strings faltantes
i18n.enableFallback = true;

export default i18n;
