

  export interface Geocode {
      SAME: string[];
      UGC: string[];
  }

  export interface Reference {
      identifier: string;
      sender: string;
      sent: Date;
  }

  export interface Parameters {
      PIL: string[];
      NWSheadline: string[];
      BLOCKCHANNEL: string[];
      VTEC: string[];
      eventEndingTime: Date[];
     
  }

  export class Properties {
    
      id: string;
      areaDesc: string;
      geocode: Geocode;
      affectedZones: string;
      references: Reference[];
      sent: Date;
      effective: Date;
      onset: Date;
      expires: Date;
      ends?: Date;
      status: string;
      messageType: string;
      category: string;
      severity: string;
      certainty: string;
      urgency: string;
      event: string;
      sender: string;
      senderName: string;
      headline: string;
      description: string;
      instruction: string;
      response: string;
      parameters: Parameters;
  }

  export interface Feature {
      id: string;
      type: string;
      geometry?: any;
      properties: Properties;
  }

  export interface Details {
      type: string;
      features: Feature[];
      title: string;
      updated: Date;
  }



