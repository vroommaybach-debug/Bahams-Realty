import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHATSAPP_PHONE_NUMBER,
  getWhatsAppUrl,
  getPropertyWhatsAppMessage,
  getDevelopmentWhatsAppMessage,
  getInspectionWhatsAppMessage,
} from './whatsapp.ts';

test('WHATSAPP_PHONE_NUMBER is properly formatted with country code and digits only', () => {
  assert.equal(WHATSAPP_PHONE_NUMBER, '2349167149677');
  assert.match(WHATSAPP_PHONE_NUMBER, /^[0-9]+$/);
});

test('getWhatsAppUrl encodes message and preserves phone number', () => {
  const url = getWhatsAppUrl('Hello Bahams Realty!', '2349167149677');
  assert.equal(url, 'https://wa.me/2349167149677?text=Hello%20Bahams%20Realty!');
});

test('getWhatsAppUrl sanitizes phone with plus signs or dashes', () => {
  const url = getWhatsAppUrl('Hi', '+234-916-714-9677');
  assert.equal(url, 'https://wa.me/2349167149677?text=Hi');
});

test('getPropertyWhatsAppMessage generates exact required format', () => {
  const msg = getPropertyWhatsAppMessage({
    title: '5 Bed Duplex',
    location: 'Ikoyi',
    id: 'BR-101',
  });
  assert.equal(
    msg,
    "Hello Bahams Realty, I'm interested in 5 Bed Duplex at Ikoyi (Ref: BR-101). Is it still available?"
  );
});

test('getDevelopmentWhatsAppMessage formats off-plan project query', () => {
  const msg = getDevelopmentWhatsAppMessage({
    name: 'The Oceanic Terraces',
    location: 'Victoria Island',
    id: 'DEV-01',
  });
  assert.equal(
    msg,
    'Hello Bahams Realty, I would like to enquire about off-plan availability and payment milestones for The Oceanic Terraces in Victoria Island (Ref: DEV-01).'
  );
});

test('getInspectionWhatsAppMessage formats booking with date and name', () => {
  const msg = getInspectionWhatsAppMessage({
    propertyTitle: 'Penthouse Suite',
    location: 'Victoria Island',
    ref: 'BR-202',
    preferredDate: '2026-11-05',
    preferredTime: '11:00 AM',
    clientName: 'Emeka Adeleke',
  });
  assert.match(msg, /Penthouse Suite/);
  assert.match(msg, /BR-202/);
  assert.match(msg, /2026-11-05/);
  assert.match(msg, /Emeka Adeleke/);
});
