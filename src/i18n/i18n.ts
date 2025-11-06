import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  pt: {
    // ---- Perfil ----
    profile: "Perfil",
    changePhoto: "Alterar foto",
    name: "Nome",
    email: "Email",
    logout: "Sair",
    logoutConfirm: "Você realmente deseja sair?",
    cancel: "Cancelar",
    loading: "Carregando perfil...",
    changeLanguage: "Trocar idioma",

    // ---- HomeScreen ----
    welcome: "Bem-vindo ao Pátio da Mottu",
    addMoto: "Adicionar Moto na Vaga",
    editMoto: "Editar Moto",
    addNewBike: "Adicionar Moto",
    platePlaceholder: "Placa (ABC-1234)",
    yearPlaceholder: "Ano",
    kmPlaceholder: "Quilometragem",
    status: "Status",
    confirm: "Confirmar",
    save: "Salvar",
    cancelButton: "Cancelar",
    errorFillAll: "Preencha todos os campos!",
    errorPlateFormat: "A placa deve seguir o formato ABC-1234 ou ABC-1D23.",
    errorYear: "Informe um ano válido.",
    errorKm: "A quilometragem deve ser um número válido.",
    errorSave: "Não foi possível salvar a moto.",
    modelLabel: "Modelo",
    plateLabel: "Placa",
    yearLabel: "Ano",
    kmLabel: "Quilometragem",
    statusValue: "Status",
    slotLabel: "Vaga",
    notAssigned: "Não atribuída",
    DISPONIVEL: "DISPONIVEL",
    ALUGADA: "ALUGADA",
    MANUTENCAO: "MANUTENÇÃO",
  },
  es: {
    // ---- Perfil ----
    profile: "Perfil",
    changePhoto: "Cambiar foto",
    name: "Nombre",
    email: "Correo electrónico",
    logout: "Cerrar sesión",
    logoutConfirm: "¿Realmente deseas salir?",
    cancel: "Cancelar",
    loading: "Cargando perfil...",
    changeLanguage: "Cambiar idioma",

    // ---- HomeScreen ----
    welcome: "Bienvenido al Patio de Mottu",
    addMoto: "Agregar Moto al Espacio",
    editMoto: "Editar Moto",
    addNewBike: "Agregar Moto",
    platePlaceholder: "Placa (ABC-1234)",
    yearPlaceholder: "Año",
    kmPlaceholder: "Kilometraje",
    status: "Estado",
    confirm: "Confirmar",
    save: "Guardar",
    cancelButton: "Cancelar",
    errorFillAll: "¡Complete todos los campos!",
    errorPlateFormat: "La placa debe seguir el formato ABC-1234 o ABC-1D23.",
    errorYear: "Ingrese un año válido.",
    errorKm: "El kilometraje debe ser un número válido.",
    errorSave: "No fue posible guardar la moto.",
    modelLabel: "Modelo",
    plateLabel: "Placa",
    yearLabel: "Año",
    kmLabel: "Kilometraje",
    statusValue: "Estado",
    slotLabel: "Espacio",
    notAssigned: "No asignado",
    DISPONIVEL: "DISPONIBLE",
    ALUGADA: "ALQUILADO",
    MANUTENCAO: "MANTENIMIENTO",
  },
});

// ✅ Define o idioma de forma segura
const deviceLanguage = Localization.locale?.slice(0, 2) || "pt";
i18n.locale = deviceLanguage === "es" ? "es" : "pt";
i18n.fallbacks = true;

export default i18n;
