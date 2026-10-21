/**
 * Bahams Realty WhatsApp Integration Utility
 *
 * HOW TO CUSTOMIZE:
 * Replace WHATSAPP_PHONE_NUMBER below with your agency's direct WhatsApp phone number.
 * Important: Use international format with country code and NO '+' sign, hyphens, or spaces.
 * Example for Nigeria: '2349167149677'
 */
export const WHATSAPP_PHONE_NUMBER = '2349167149677';

/**
 * Builds a standard wa.me URL with clean URI-encoded text.
 */
export function getWhatsAppUrl(message: string, phoneNumber: string = WHATSAPP_PHONE_NUMBER): string {
  // Strip any accidental spaces, pluses, or dashes from phone number
  const sanitizedPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${sanitizedPhone}?text=${encodedText}`;
}

/**
 * Pre-filled message for general enquiries or floating button.
 */
export function getGeneralWhatsAppMessage(): string {
  return "Hello Bahams Realty, I would like to speak with an advisor regarding properties and investments in Lagos.";
}

/**
 * Pre-filled message for a specific property listing.
 */
export function getPropertyWhatsAppMessage(property: {
  title: string;
  location: string;
  id: string;
  ref?: string;
}): string {
  const reference = property.ref || property.id;
  return `Hello Bahams Realty, I'm interested in ${property.title} at ${property.location} (Ref: ${reference}). Is it still available?`;
}

/**
 * Pre-filled message for scheduling a property inspection.
 */
export function getInspectionWhatsAppMessage(params: {
  propertyTitle: string;
  location: string;
  ref: string;
  preferredDate?: string;
  preferredTime?: string;
  clientName?: string;
}): string {
  let msg = `Hello Bahams Realty, I would like to book an inspection for ${params.propertyTitle} at ${params.location} (Ref: ${params.ref}).`;
  if (params.preferredDate) {
    msg += ` Preferred date: ${params.preferredDate}`;
    if (params.preferredTime) {
      msg += ` around ${params.preferredTime}`;
    }
    msg += '.';
  }
  if (params.clientName) {
    msg += ` My name is ${params.clientName}.`;
  }
  return msg;
}

/**
 * Pre-filled message for an off-plan development project.
 */
export function getDevelopmentWhatsAppMessage(development: {
  name: string;
  location: string;
  id: string;
  unitType?: string;
}): string {
  if (development.unitType) {
    return `Hello Bahams Realty, I'm enquiring about the ${development.unitType} unit at ${development.name} in ${development.location} (Ref: ${development.id}). Please share available inventory and payment schedules.`;
  }
  return `Hello Bahams Realty, I would like to enquire about off-plan availability and payment milestones for ${development.name} in ${development.location} (Ref: ${development.id}).`;
}

/**
 * Pre-filled message for a specific service category.
 */
export function getServiceWhatsAppMessage(serviceTitle: string): string {
  return `Hello Bahams Realty, I would like to consult your advisory team regarding your "${serviceTitle}" service in Lagos.`;
}
