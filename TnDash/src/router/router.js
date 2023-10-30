import { createWebHashHistory, createRouter } from "vue-router";
import { $global } from '@/main.js'
import Home from "@/components/Home";
import Register from "@/components/Register";
import ForgotPassword from "@/components/ForgotPassword";
import SnapshotTrends from "@/components/SnapshotTrends";
import TenderCreation from "@/components/TenderCreation";
import TenderstageAnalysis from "@/components/TenderstageAnalysis";
import DelayAnalysis from "@/components/DelayAnalysis";
import WelcomeDashboard from "@/components/common/WelcomeDashboard";
import ProcuringEntityOnboarding from "@/components/Onboarding/ProcuringEntityOnboarding";
import DepartmentUserOnboarding from "@/components/Onboarding/DepartmentUserOnboarding";
import VendorOnboarding from "@/components/Onboarding/VendorOnboarding";
import ModuleWiseFeedback from "@/components/Onboarding/ModuleWiseFeedback";
import PortalAvailability from "@/components/Onboarding/PortalAvailability";
import TenderRobustnessScore from "@/components/robustness/TenderRobustnessScore";
import PriceComparisonReport from "@/components/robustness/PriceComparisonReport";
import BidderFlaggingReport from "@/components/robustness/BidderFlaggingReport";
import BidsPerTender from "@/components/robustness/BidsPerTender";
import TechnicalDisqualification from "@/components/robustness/TechnicalDisqualification";
import SupplierConcentration from "@/components/robustness/SupplierConcentration";
import NegotiationReport from "@/components/robustness/NegotiationReport";
import TenderOutlierReport from "@/components/TenderOutlier/TenderOutlierReport";
import BidderOutlierTab from "@/components/TenderOutlier/BidderOutlierTab";
import ProcuringEntityOutliers from "@/components/TenderOutlier/ProcuringEntityOutliers";
import DataSearch from "@/components/DataSearch/dataSearch";
import EventDiaryReport from "@/components/DataSearch/EventDiary/eventDiaryReport";

import services from "@/services/service";

const routes = [{
  path: "/welcome/",
  name: "WelcomeDashboard",
  component: WelcomeDashboard,
  children: [{
    path: 'trends',
    name: 'trends',
    component: SnapshotTrends
  },
  {
    path: 'tenderCreation',
    name: 'tenderCreation',
    component: TenderCreation
  },
  {
    path: 'tenderstageAnalysis',
    name: 'tenderstageAnalysis',
    component: TenderstageAnalysis
  },
  {
    path: 'delayAnalysis',
    name: 'delayAnalysis',
    component: DelayAnalysis
  },
  {
    path: 'procuringEntityOnboarding',
    name: 'procuringEntityOnboarding',
    component: ProcuringEntityOnboarding
  },
  {
    path: 'departmentUserOnboarding',
    name: 'departmentUserOnboarding',
    component: DepartmentUserOnboarding
  },
  {
    path: 'vendorOnboarding',
    name: 'vendorOnboarding',
    component: VendorOnboarding
  },
  {
    path: 'moduleWiseFeedback',
    name: 'moduleWiseFeedback',
    component: ModuleWiseFeedback
  },
  {
    path: 'portalAvailability',
    name: 'portalAvailability',
    component: PortalAvailability
  },
  {
    path: 'tenderRobustnessScore',
    name: 'tenderRobustnessScore',
    component: TenderRobustnessScore
  },
  {
    path: 'priceComparisonReport',
    name: 'priceComparisonReport',
    component: PriceComparisonReport
  },
  {
    path: 'bidderFlaggingReport',
    name: 'bidderFlaggingReport',
    component: BidderFlaggingReport
  },
  {
    path: 'bidsPerTender',
    name: 'bidsPerTender',
    component: BidsPerTender
  },
  {
    path: 'technicalDisqualification',
    name: 'technicalDisqualification',
    component: TechnicalDisqualification
  },
  {
    path: 'supplierConcentration',
    name: 'supplierConcentration',
    component: SupplierConcentration
  },
  {
    path: 'negotiationReport',
    name: 'negotiationReport',
    component: NegotiationReport
  },
  {
    path: 'tenderOutlierReport',
    name: 'tenderOutlierReport',
    component: TenderOutlierReport
  },
  {
    path: 'procuringEntityOutliers',
    name: 'procuringEntityOutliers',
    component: ProcuringEntityOutliers
  },
  {
    path: 'bidderOutlierTab',
    name: 'bidderOutlierTab',
    component: BidderOutlierTab
  },
  {
    path: 'dataSearch',
    name: 'dataSearch',
    component: DataSearch
  },
  {
    path: 'eventDiaryReport',
    name: 'eventDiaryReport',
    component: EventDiaryReport
  }],
},
{
  path: "/forgotPassword",
  name: "ForgotPassword",
  component: ForgotPassword
},
{
  path: "/",
  name: "Home",
  component: Home
},
{
  path: "/registerPage",
  name: "registerPage",
  component: Register,
}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  services.checkserver();
  const publicPages = ['/', '/registerPage', '/forgotPassword'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = $global.$store.secureToken;
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    if (to.path == '/welcome/' || to.path == '/welcome') {
      next({
        name: from.name
      })
    } else if (to.matched.length == 0) {
      next({
        name: from.name
      })
    }
    next();
  }
});

export default router;