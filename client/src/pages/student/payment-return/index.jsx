import { useLocation } from "react-router-dom";
//import { Card, CardHeader, CardTitle } from ("@/components/ui/card");
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { captureAndFinalizePaymentService } from "@/services";

function PaypalPaymentReturnPage(){

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
          async function capturePayment() {
            const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    
            const response = await captureAndFinalizePaymentService(
              paymentId,
              payerId,
              orderId
            );
    
            if (response?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/student-courses";
            }
          }
    
          capturePayment();
        }
      }, [payerId, paymentId]);

    
    return(
        <Card>
            <CardHeader>
                <CardTitle>Processing payment... Please Wait for some time.</CardTitle>
            </CardHeader>
        </Card>
    );
}

export default PaypalPaymentReturnPage;