/**
 *
 *
 * @export
 * @class Constants
 */
export class Constants {
    /**
     *
     *
     * @static
     * @type {string}
     * @memberof Constants
     */
    public static readonly API_BASE_URL: string = 'http://localhost:8761//api';



    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // Billing Apis
    // --------------------------------------------------------------------------------------------------------------------------------------------------------

    /**
     *
     *
     * @static
     * @type {string}
     * @memberof Constants
     */
    public static readonly BILLING_API_BASE: string = Constants.API_BASE_URL + '/billing';

    public static readonly SAVE_BILL_API: string = Constants.BILLING_API_BASE + '/billing/save-bill';

    public static readonly GET_ALL_BILLS_BY_SHOP_ID: string = Constants.BILLING_API_BASE + '/billing/fetch-bill/shop-id';

    public static readonly GET_BILL_BY_ID: string = Constants.BILLING_API_BASE + '/billing/find-bill/bill-id';

    public static readonly GET_ALL_BILLS_BY_DATE_RANGE: string = Constants.BILLING_API_BASE + '/billing/fetch-bill/date-range';

    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // Payment Service Apis
    // --------------------------------------------------------------------------------------------------------------------------------------------------------

    public static readonly PAYMENT_API_BASE: string = Constants.API_BASE_URL + '/payment-api';

    public static readonly PAYMENT_TYPE_FETCH_API: string = Constants.PAYMENT_API_BASE + '/payment/find-payments/shop';

    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // Salon Service Apis
    // --------------------------------------------------------------------------------------------------------------------------------------------------------

    public static readonly SALON_SERVICE_API_BASE: string = Constants.API_BASE_URL + '/service-api';

    public static readonly SALON_SERVICES_FETCH_API: string = Constants.SALON_SERVICE_API_BASE + '/service/find-service/shop';

    public static readonly SALON_SERVICES_SAVE_SERVICE_API: string = Constants.SALON_SERVICE_API_BASE + '/service/save-service';
    
    public static readonly SALON_SERVICES_UPDATE_SERVICE_API: string = Constants.SALON_SERVICE_API_BASE + '/service/update-service';

    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // Customer Apis
    // --------------------------------------------------------------------------------------------------------------------------------------------------------

    public static readonly CUSTOMER_API_BASE: string = Constants.API_BASE_URL + '/cust-api';

    public static readonly CUSTOMER_REGISTRATION_API: string = Constants.CUSTOMER_API_BASE + '/customer/save-customer';

    public static readonly ALL_CUSTOMERS_SHOP_ID_API: string = Constants.CUSTOMER_API_BASE + '/customer/fetch-customer/shop-id';


    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // Security Apis
    // --------------------------------------------------------------------------------------------------------------------------------------------------------


    public static readonly SECURITY_API_BASE: string = Constants.API_BASE_URL + '/service-api';

    public static readonly GET_ALL_ROLES: string = Constants.SECURITY_API_BASE + '/security/fetch-all-roles';


    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    // Communication Apis
    // --------------------------------------------------------------------------------------------------------------------------------------------------------


    public static readonly COMMUNICATION_API_BASE: string = Constants.API_BASE_URL +'/sms-api/';

    public static readonly COMMUNICATION_SEND_EMAIL_API: string = Constants.COMMUNICATION_API_BASE + '/sms/email-sender';

}
