window.REACT_APP_ENVIRONMENT = "local"

if (window.location.protocol != "https:") {
    window.REACT_APP_STORE_SERVICE_API_URL = "http://dev.dccmtx.com/api/store-service/"
    window.REACT_APP_ADMIN_SERVICE_API_URL = "http://dev.dccmtx.com/api/administration-service/"
    window.REACT_APP_PRODUCT_SERVICE_API_URL = "http://dev.dccmtx.com/api/product-service/"
    window.REACT_APP_REPAIR_SERVICE_API_URL = "http://dev.dccmtx.com/api/repair-service/"
} else {
    window.REACT_APP_STORE_SERVICE_API_URL = "https://dev.dccmtx.com/api/store-service/"
    window.REACT_APP_ADMIN_SERVICE_API_URL = "https://dev.dccmtx.com/api/administration-service/"
    window.REACT_APP_PRODUCT_SERVICE_API_URL = "https://dev.dccmtx.com/api/product-service/"
    window.REACT_APP_REPAIR_SERVICE_API_URL = "https://dev.dccmtx.com/api/repair-service/"
}
