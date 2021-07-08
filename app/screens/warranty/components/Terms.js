import React from "react";
import { View, StyleSheet, Modal, ScrollView } from "react-native";
import AppButton from "../../../components/AppButton";
import AppText from "../../../components/AppText";

import Screen from "../../../components/Screen";

import colors from "../../../config/colors";
import defaultStyles from "../../../config/styles";

/**
 * Terms and conditions for purchasing a quote.
 *
 * @param {boolean} visible Visibility of the modal
 * @param {function} setVisible Function to set the visibility of the modal
 * @returns
 */
function Terms({ visible, setVisible }) {
  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.background}>
        <Screen>
          <View style={styles.container}>
            <AppButton
              icon="close"
              size={30}
              backgroundColor={null}
              color={colors.primary}
              border={null}
              onPress={() => setVisible(false)}
              style={styles.closeButton}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              centerContent
              contentContainerStyle={styles.scrollView}
            >
              <AppText style={styles.title1}>
                WARRANTYWISE CAR DEALER - USED CAR WARRANTY - ADMINISTRATION
                AGREEMENT
              </AppText>
              <AppText style={styles.paragraph1}>
                Warrantywise is a UK based used car warranty provider and has
                developed an expertise in the marketing, management and
                administration of used car warranty repairs for all current EU
                vehicle make and models, throughout a UK network of repair
                garages and specialists repairers including franchised main
                dealers.
              </AppText>
              <AppText style={styles.paragraph1}>
                Warrantywise has also developed a recognised, professional and
                valuable public brand image that the Dealer wishes to be
                associated with and take advantage of.
              </AppText>
              <AppText style={styles.paragraph1}>
                The basis of this agreement is that the dealer agrees to use
                Warrantywise on an exclusive basis for all its used car warranty
                services and agrees to pay Warrantywise for the use of its
                system and services. The charges required by Warrantywise will
                include amounts to provide for dealer forecourt marketing
                materials, customer sales information, roadside breakdown
                services, independent inspection reports, repair claims
                administration, cash repair payments and will also include a
                margin to Warrantywise.
              </AppText>
              <AppText style={styles.paragraph1}>
                The above sets out the basic the proposed relationship between
                WARRANTYWISE and the DEALER and is background information only.
                The AGREEMENT (each as defined below) between the parties shall
                be subject to the terms and conditions set out below.
              </AppText>

              <AppText style={styles.title1}>TERMS AND CONDITIONS</AppText>
              <AppText style={styles.title2}>
                1. In this AGREEMENT (as defined below):
              </AppText>
              <AppText style={styles.title3}>
                1.1 the following words and expressions have the following
                meanings and, in addition, any words and expressions defined in
                any clause will have the same meaning when used in any other
                clause:
              </AppText>
              <AppText style={styles.paragraph1}>
                AGREEMENT has the meaning given to it in clause 1.2;
              </AppText>
              <AppText style={styles.paragraph1}>
                CUSTOMER has the meaning given to it in paragraph 1.1, Schedule
                1;
              </AppText>
              <AppText style={styles.paragraph1}>
                DEALER has the meaning given to it in paragraph 1.1, Schedule 1;
              </AppText>
              <AppText style={styles.paragraph1}>
                DEALERNET on-line Internet portal booking facility used by
                WARRANTYWISE and the DEALER to administer their relationship
                pursuant to the terms of this AGREEMENT;
              </AppText>
              <AppText style={styles.paragraph1}>
                EARNED ACCOUNT the amount of funds in the earned account shall
                be calculated as follows:
              </AppText>
              <AppText style={styles.paragraph2}>
                (i) Funds actually paid by the DEALER to WARRANTYWISE to cover
                the performance of the SERVICES in relation to the DEALER’S
                WARRANTYWISE PLANS
              </AppText>
              <AppText style={styles.paragraph2}>MINUS</AppText>
              <AppText style={styles.paragraph2}>
                (ii) outgoings incurred by WARRANTYWISE in performing the
                SERVICES, including but not limited to payments made to
                CUSTOMERS for FAILURES and administration costs.
              </AppText>
              <AppText style={styles.paragraph1}>
                FAILURES has the meaning given to it in paragraph 1.1, Schedule
                1;
              </AppText>
              <AppText style={styles.paragraph1}>
                LIABILITY liability arising out of or in connection with this
                AGREEMENT, whether in contract, tort, misrepresentation,
                restitution, under statute or otherwise, including (without
                limitation) any liability under an indemnity contained in this
                AGREEMENT and/or arising from a breach of, or a failure to
                perform or defect or delay in performance of, any of a party’s
                obligations under this AGREEMENT, in each case howsoever caused
                including (without limitation) if caused by negligence;
              </AppText>
              <AppText style={styles.paragraph1}>
                MARKETING MATERIALS has the meaning given to it in clause 1.10;
              </AppText>
              <AppText style={styles.paragraph1}>
                SERVICES are set out in Schedule 1; TERM has the meaning given
                to it in clause 1.6;
              </AppText>
              <AppText style={styles.paragraph1}>
                VEHICLE has the meaning given to it in paragraph 1.1, Schedule
                1;
              </AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE has the meaning given to is in clause 1.2; and
              </AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE PLANS has the meaning given to it in paragraph 1.1,
                Schedule 1.
              </AppText>
              <AppText style={styles.title3}>
                1.2 Under this Car Dealer Used Car Warranty Administration
                Agreement (the AGREEMENT) Warrantywise (WARRANTYWISE) will
                provide the SERVICES.
              </AppText>
              <AppText style={styles.title3}>1.3 The Administrator</AppText>
              <AppText style={styles.paragraph1}>
                1.3.1 Subject to receiving all payments which are payable in
                connection with this AGREEMENT, WARRANTYWISE, whose registered
                office address is at The Rocket Centre, Trident Park, Blackburn,
                BB1 3NU, w i l l manage and administer the WARRANTYWISE PLANS
                within the terms of this AGREEMENT on behalf of the DEALER.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.3.2 Discretion is an important aspect of how the WARRANTYWISE
                PLANS are administered and, as a consequence, WARRANTYWISE will
                make all decisions in relation to the management and
                administration, including the authorisation of the repairs and
                the payments associated with that, of each WARRANTYWISE PLAN in
                its absolute discretion.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.3.3 The DEALER hereby acknowledges and agrees that
                WARRANTYWISE is not a party to the sale of any VEHICLE to a
                CUSTOMER or any of the WARRANTYWISE PLANS, which are direct
                contractual relationships between the DEALER and each CUSTOMER.
                Therefore, for the avoidance of doubt, WARRANTYWISE, its
                employees and its agents shall have no LIABILITY in respect of
                any damage or loss suffered by the DEALER or CUSTOMER or any
                third party in connection with the any WARRANTYWISE PLAN or the
                sale of any VEHICLE.
              </AppText>
              <AppText style={styles.title3}>1.4 Exclusions</AppText>
              <AppText style={styles.paragraph1}>
                Subject to any other exclusions contained in this AGREEMENT,
                WARRANTYWISE will not be required to manage:
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.1 the costs of any FAILURE that is not covered or included
                under the terms of the relevant WARRANTYWISE PLAN selected by
                the DEALER;
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.2 the refund of any payment made by the DEALER on an
                ex-gratia or without prejudice basis unless otherwise agreed in
                writing by WARRANTYWISE;
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.3 the costs of any FAILURE which at the time of its
                occurrence is insured by or would but for the existence of this
                AGREEMENT be covered by any other warranty policy or guarantee;
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.4 the costs of any repairs made beyond the extent of this
                AGREEMENT;
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.5 the costs of any FAILURE which occurred prior to the
                respective WARRANTYWISE PLAN start date;
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.6 the costs of any FAILURE which becomes apparent in
                relation to the VEHICLES after the respective WARRANTYWISE PLAN
                has expired, terminated or otherwise ended; and
              </AppText>
              <AppText style={styles.paragraph1}>
                1.4.7 the costs of any repairs carried out before the
                commencement date of any WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title3}>
                1.5 Cancellation, Termination and Post-Termination
              </AppText>
              <AppText style={styles.paragraph1}>
                1.5.1 Within the first 14 days of this AGREEMENT, you will be
                entitled to cancel this AGREEMENT by:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) providing written notice to WARRANTYWISE; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) immediately returning all MARKETING MATERIALS or other
                documentation received from WARRANTYWISE in accordance with
                clause 1.10, in which case all arrangements will be cancelled
                and any monies remaining on account which do not relate to
                outstanding obligations in relation to any particular
                WARRANTYWISE PLAN will be returned to you in full by
                WARRANTYWISE, provided that no repairs have been registered or
                authorised by WARRANTYWISE.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.5.2 You will be entitled to terminate this AGREEMENT after the
                first 14 days of this AGREEMENT by providing 30 days’ written
                notice of the same to WARRANTYWISE , in which case there will be
                no refund of any monies already paid to WARRANTYWISE pursuant to
                the terms of this AGREEMENT or any WARRAN TYWISE PLAN.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.5.3 WARRANTYWISE will be entitled to terminate this AGREEMENT
                with immediate effect by providing 30 days’ written notice of
                the same to you.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.5.4 WARRANTYWISE reserves the absolute right to terminate this
                AGREEMENT immediately and without notice in the event that:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) the DEALER fails to comply with its obligations under the
                terms of this AGREEMENT;
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) the DEALER otherwise provides WARRANTYWISE with any
                misleading or false information in order to secure the services
                of WARRANTYWISE within the terms of this AGREEMENT or within the
                terms of any WARRANTYWIS E PLAN; or
              </AppText>
              <AppText style={styles.paragraph2}>
                (c) the DEALER is unable to pay its debts as they fall due or
                the value of its assets are less than its liabilities, including
                its contingent and prospective liabilities.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.5.5 In the event of cancellation or termination of this
                AGREEMENT and in respect of WARRANTYWISE PLANS issued by the
                DEALER prior to the cancellation or termination date and
                accepted by WARRANTYWISE, such WARRANTYWISE PLANS will not be
                affected in any way and WARRANTYWISE will continue to administer
                those WARRANTYWISE PLANS within the terms of this AGREEMENT
                until the respective WARR ANTYWISE PLANS expiry dates, unless:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) the aggregate of payments on account made by the DEALER up
                until and including the date of cancellation or termination are
                deemed by WARRANTYWISE in its absolute discretion as being
                insufficient to continue to admi nister the AGREEMENT; or
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) the WARRANTYWISE PLANS are otherwise cancelled in accordance
                with the terms of the WARRANTYWISE PLANS.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.5.6 In the event that WARRANTYWISE ceases to administer any
                WARRANTYWISE PLANS pursuant to clause 1.5.5 above:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) the DEALER shall accept all LIABILITY for the administration
                of the WARRANTYWISE PLANS;
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) all costs associated with the WARRANTYWISE PLANS shall rest
                with the DEALER ; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (c) WARRANTYWISE will provide notice to all CUSTOMERS so
                affected.
              </AppText>
              <AppText style={styles.paragraph1}>
                Following the termination of this AGREEMENT this clause 1.5.6
                shall remain in force.
              </AppText>
              <AppText style={styles.title3}>1.6 Term</AppText>
              <AppText style={styles.paragraph1}>
                This AGREEMENT will remain in force until cancelled or
                terminated by either party in pursuant to clause 1.5 above or
                otherwise terminated in accordance with the terms of this
                AGREEMENT (the TERM).
              </AppText>
              <AppText style={styles.title3}>
                1.7 Process for authorising Repairs
              </AppText>
              <AppText style={styles.paragraph1}>
                1.7.1 Subject to clause 1.5.6, all valid requests for repairs
                made by a CUSTOMER pursuant to and in accordance with the terms
                of the relevant WARRANTYWISE PLAN are to be handled by
                WARRANTYWISE.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.7.2 In the event that a CUSTOMER contacts you directly in
                relation to a WARRANTYWISE PLAN, you should refer that CUSTOMER
                to WARRANTYWISE via the direct repairs input page
                www.warrantywise.co.uk/repairs or on the following number: 01254
                355102.
              </AppText>
              <AppText style={styles.title3}>1.8 Complaints Process</AppText>
              <AppText style={styles.paragraph1}>
                1.8.1 In the event that you have any questions or queries, these
                should be directed to your Account Manager, as notified to you
                by us from time to time, by telephoning 01254 355104.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.2 WARRANTYWISE will use reasonable endeavours to ensure that
                y our query is acknowledged whilst you are on the phone with
                your Account Manager pursuant to clause 1.8.1 above or by return
                of post or by email.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.3 If you require a review of any amount we have agreed to
                pay towards a repair authorised under a WARRANTYWISE PLAN please
                telephone 01254 355102 and speak to the Repairs Department.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.4 WARRANTYWISE will use reasonable endeavours to ensure that
                your query is acknowledged whilst you are on the phone with the
                Repairs Department or by return of post or by email within 5
                working days.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.5 If you are unhappy with how we have exercised our
                discretion in relation to any repair decision which has been
                declined or approved and wish to have a further review you need
                to do so in writing within 14 days to: Customer Services
                Appliance Warranty Limited, 3 Trident Way, Trident park,
                Blackburn BB1 3NU or by email to:
                customerservices@warrantywise.co.uk. WARRANTYWISE will use
                reasonable endeavours to ensure that your query is acknowledged
                by return of p ost or by email and answered within 5 working
                days.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.6 Any attempts to complain using other forms of
                communication will not be considered and all such complaints
                should be issued in writing or via email pursuant to clause
                1.8.5 above.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.7 If you are not completely satisfied with the outcome of
                any review, please write to the Director & Actuary at:
                ak@warrantywise.co.uk or via post to the registered office
                address of WARRANTYWISE listed above in clause 1.8.5.
                WARRANTYWISE will use reasonable endeavours to ensure that your
                query is acknowledged by return of post or by email and answered
                within 5 working days.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.8 In the event that you have exhausted all complaints
                options available to you in clauses 1.8.1 – 1.8.7 above, you can
                ask for your case to be reviewed personally by Quentin Willson
                via email at: quentinwillson@warrantywise.co.uk. WARRANTYWISE
                will use reasonable endeavours to ensure that your query is
                acknowledged by return of post or by email and answered within 5
                working days.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.8.9 In the event that WARRANTYWISE contacts you via telephone,
                calls may be recorded for quality and training purposes.
              </AppText>
              <AppText style={styles.title3}>1.9 Fraud</AppText>
              <AppText style={styles.paragraph1}>
                1.9.1 If, in the opinion of WARRANTYWISE (to be exercised in its
                absolute discretion), you, your CUSTOMERS or a repairer engaged
                pursuant to the terms of a WARRANTYWISE PLAN have or are
                suspected to have provided WARRANTYWISE (or any Independent
                Vehicle Examiner) with any:
              </AppText>
              <AppText style={styles.paragraph2}>(a) false;</AppText>
              <AppText style={styles.paragraph2}>(b) dishonest; and/or</AppText>
              <AppText style={styles.paragraph2}>
                (c) exaggerated information or statement,
              </AppText>
              <AppText style={styles.paragraph1}>
                in order to obtain lower repair costs then WARRANTYWISE will be
                entitled to suspend any repair authorisation under the
                WARRANTYWISE PLANS until a fraud investigation has been
                completed.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.9.2 WARRANTYWISE will use reasonable endeavours to provide you
                with a final response or advise you when a response will be
                issued within four (4) weeks of the investigation pursuant to
                clause 1.9.1 above starting.
              </AppText>
              <AppText style={styles.title3}>1.10 Return of Documents</AppText>
              <AppText style={styles.paragraph1}>
                In the event of cancellation or termination of this AGREEMENT
                and in respect of all merchandising materials, point of sale
                materials or other such materials , that WARRANTYWISE may have
                supplied to the DEALER pursuant to Schedule 2 (the MARKETING
                MATERIALS), the DEALER will, within 7 days of the cancellation
                or termination of this AGREEMENT:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) return the MARKETING MATERIALS to WARRANTYWISE; or
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) in the event that it cannot or will not return the MARKETIN
                G MATERIALS pursuant to clause 1.10 (a) above, pay the cost
                price listed in Schedule 1 for each of the MARKETING MATERIALS
                provided to the DEALER by WARRANTYWISE or such other current
                costs as WARRANTYWISE may reasonably specify to replace the
                MARKETING MA TERIALS.
              </AppText>
              <AppText style={styles.paragraph1}>
                Following the termination or cancellation of this AGREEMENT this
                clause 1.10 shall remain in force.
              </AppText>

              <AppText style={styles.title2}>2. THIS AGREEMENT</AppText>
              <AppText style={styles.title3}>2.1 Requests for repairs</AppText>
              <AppText style={styles.paragraph1}>
                2.1.1 It is hereby agreed that subject to the terms,
                definitions, exclusions and conditions contained herein or
                endorsed hereon WARRANTYWISE will administer, in its absolute
                discretion and at the DEALER’S cost and expense, payments to
                CUSTOMERS under each WARRANTYWISE PLAN, for all WARRANTYWISE
                PLANS which are:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) issued by the DEALER during the period of this AGREEMENT;
                and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) accepted by WARRANTYWISE under the terms of this AGREEMENT.
              </AppText>
              <AppText style={styles.paragraph1}>
                2.1.2 The DEALER hereby acknowledges and agrees that, subject to
                clause 2.1.1 above, WARRANTYWISE may in its absolute discretion,
                make ‘goodwill’ payments as it deems appropriate to a CUSTOMER
                for an event or FAILURE which is not covered pursuant to and in
                accordance with terms and conditions of a WARRANTYWISE PLAN,
                provided that , unless such payments are agreed with the Dealer,
                any such payments are made at the cost and expense of
                WARRANTYWISE and in particular when deemed necessary to preserve
                and maintain the goodwill and reputation of WARRANTYWISE.
              </AppText>
              <AppText style={styles.paragraph1}>
                2.1.3 In the event that WARRANTYWISE makes a goodwill payment to
                a CUSTOMER for an event or FAILURE which is not covered by the
                terms and conditions of a WARRANTYWISE PLAN, pursuant to clauses
                2.1.1 or 2.1.2 above, such a payment will not set any precedent
                and WARRANTYWISE will have no obligation to make similar
                payments to other CUSTOMERS or in relation to other WARRANTYWISE
                PLANS.
              </AppText>
              <AppText style={styles.paragraph1}>
                2.1.4 WARRANTYWISE will be under no obligation to:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) consider a request for payment under a WARRANTYWISE PLAN;
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) administer a WARRANTYWISE PLAN following a reques t for the
                same from the DEALER; or
              </AppText>
              <AppText style={styles.paragraph2}>
                (c) provide the SERVICES,
              </AppText>
              <AppText style={styles.paragraph1}>
                where the DEALER’S EARNED ACCOUNT with WARRANTYWISE is in
                deficit or where sufficient funds are not in place and projected
                to cover the cost of such a payment.
              </AppText>
              <AppText style={styles.paragraph1}>
                2.2 The DEALER should complete together with each CUSTOMER an
                application via the DEALERNET for each WARRANTYWISE PLAN and
                shall ensure that it obtains an appropriate consent from each
                CUSTOMER to pass W ARRANTYWISE the personal data it requires for
                all purposes set out in the data protection clause in the
                WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.paragraph1}>
                2.3 WARRANTYWISE shall confirm in writing to each CUSTOMER that
                the WARRANTYWISE PLAN is effective and shall issue a schedule
                which confirms the terms of the WARRANTYWISE PLAN prior to the
                WARRANTYWISE PLAN becoming effective.
              </AppText>
              <AppText style={styles.paragraph1}>
                2.4 Only those WARRANTYWISE PLANS confirmed in writing by
                WARRANTYWISE with the issue of a schedule pursuant to clause 2.3
                above will be included under the terms of this AGREEMENT.
              </AppText>

              <AppText style={styles.title2}>
                3. Limitations of Liability
              </AppText>
              <AppText style={styles.title3}>
                3.1 Subject to clause 3.3, WARRANTYWISE and its employees and
                agents shall not have any LIABILITY to the DEALER or its
                CUSTOMER under any circumstances save to the extent that such
                LIABILITY arises as a direct result of WARRANTYWISE breaching
                its obligations under this AGREEMENT.
              </AppText>
              <AppText style={styles.title3}>
                3.2 WARRANTYWISE and its employees and agents shall not have any
                LIABILITY to the DEALER for the following:
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.1 loss of profit (whether direct, indirect or
                consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.2 loss of revenue, loss of production or loss of business
                (in each case whether direct, indirect or consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.3 loss of goodwill, loss of reputation or loss of
                opportunity (in each case whether direct, indirect or
                consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.4 loss of anticipated savings or loss of margin (in each
                case whether direct, indirect or consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.5 loss of bargain (whether direct, indirect or
                consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.6 liability of the WARRANTYWISE to third parties (whether
                direct, indirect or consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.7 loss of use or value of any data or software (whether
                direct, indirect or consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.8 wasted management, operational or other time (whether
                direct, indirect or consequential);
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.9 indirect, consequential or special loss; or
              </AppText>
              <AppText style={styles.paragraph1}>
                3.2.10 any cost where the DEALER or VEHICLE manufacturer makes
                an ex gratia or without prejudice settlement or which has not
                specifically been agreed in writing by WARRANTYWISE, subject
                always to clause 3.3.
              </AppText>
              <AppText style={styles.title3}>
                3.3 Nothing in this AGREEMENT will operate to exclude or
                restrict WARRANTYWISE’S liability (if any) to the DEALER:
              </AppText>
              <AppText style={styles.paragraph1}>
                3.3.1 for its fraud or fraudulent misrepresentation or fraud or
                fraudulent misrepresentation by a person for whom it is
                vicariously liable; and
              </AppText>
              <AppText style={styles.paragraph1}>
                3.3.2 for any matter for which it is not permitted by law to
                exclude or limit, or to attempt to exclude or limit, its
                liability.
              </AppText>
              <AppText style={styles.title3}>3.4 Other warranties</AppText>
              <AppText style={styles.paragraph1}>
                This AGREEMENT does not cover any FAILURE which at the time of
                the breakdown is insured by or would but for the existence of
                this AGREEMENT be insured or covered by any other policy
                guarantee or warranty and WARRANTYWISE is not therefore liable
                or responsible to the DEALER or the CUSTOMERS in respect
                thereof.
              </AppText>
              <AppText style={styles.title3}>3.5 Loss of Use</AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE are not liable for any costs or out of pocket
                expenses of the DEALER howsoever arising or any loss arising out
                of any CUSTOMER’S loss of use of their VEHICLE or any part
                thereof.
              </AppText>
              <AppText style={styles.title3}>
                3.6 Extent of this Agreement
              </AppText>
              <AppText style={styles.paragraph1}>
                3.6.1 The SERVICES provided within the terms of this AGREEMENT
                and within the terms of the WARRANTYWISE PLAN are in addition
                (and not any substitute) to any rights the CUSTOMER may have
                against the DEALER under applicable laws or regulations
                including the Sale of Goods Act 1979, Sale and Supply of Goods
                to Consumer Regulations 2002 and the Consumer Rights Act 2015.
                WARRANTYWISE will not be liable for the management or
                administration of any repairs which are required to be made
                beyond the extent of this AGREEMENT.
              </AppText>
              <AppText style={styles.title3}>
                3.7 Subject to clause 3.3, WARRANTYWISE’S maximum aggregate
                LIABILITY to the DEALER, will be limited to the DEALER’S EARNED
                ACCOUNT balance at the point in time such LIABILITY is incurred.
              </AppText>
              <AppText style={styles.title3}>
                3.8 The maximum amount WARRANTYWISE will be required to pay to a
                CUSTOMER under the terms of any WARRANTYWISE PLAN in respect of
                any one repair will not normally exceed £5,000 (including VAT)
                and in the aggregate will not exceed the retail value of the
                VEHICLE (including VAT) during the period of each WARRANTYWISE
                PLAN or any other amount as may be specified from time to time
                in the individual application or documentation of the
                WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title3}>
                3.9 Any costs of repairs required to be paid that are in excess
                of the limits under the WARRANTYWISE PLANS shall be the sole
                responsibility and at the expense of the DEALER.
              </AppText>
              <AppText style={styles.title3}>
                3.10 This AGREEMENT is a service agreement and nothing herein
                constitutes a contract of insurance. The DEALER therefore agrees
                to maintain its account with WARRANTYWISE in receipt of
                sufficient funds as WARRANTYWISE may determine, in its absolute
                discretion, from time to time, as are required to settle all
                requests for repairs under the WARRANTYWISE PLANS and to enable
                WARRANTYWISE to provide and maintain the SERVICES.
              </AppText>
              <AppText style={styles.title3}>3.11 Force Majeure</AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE will not be in breach of this AGREEMENT or
                otherwise liable to the DEALER for any failure to perform or
                delay in performing its obligations under this AGREEMENT to the
                extent that such failure or delay is due to any event or
                circumstance that it is beyond the reasonable control of
                WARRANTYWISE, including but not limited to: war, invasion, acts
                of foreign enemies, hostilities (whether war be declared or
                not), civil war, rebellion, revolutions, insurrection, military
                or usurped power, riot, civil commotion, strikes, lockout,
                terrorism, malicious intent or vandalism, confiscation or
                nationalisation of or requisition or destruction of or damage to
                property by or under the order of any government or public or
                local authority.
              </AppText>
              <AppText style={styles.title2}>4. CONDITIONS</AppText>
              <AppText style={styles.title3}>4.1 Payments</AppText>
              <AppText style={styles.paragraph1}>
                The DEALER shall pay WARRANTYWISE the charges listed on the
                DEALERNET, together with any other interim charges as may be
                required from time to time by WARRANTYWISE in order to maintain
                the DEALER’S account with WARRANTYWISE
              </AppText>
              <AppText style={styles.title3}>
                4.2 Variation of Services and Payments
              </AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE will be entitled to make, and the DEALER agrees to
                accept, any amendments or alterations to the SERVICES detailed
                in Schedule 1 and/or charges detailed in Schedule 2 which have
                been determined as necessary by WARRANTYWISE from time to time
                acting in its absolute discretion in order to provide and
                maintain the SERVICES at the levels required by the DEALER and,
                in particular, in order to redress any deficit balances of the
                DEALER’S account with WARRANTYWISE by providing the DEALER with
                30 days’ notice in writing of the same.
              </AppText>
              <AppText style={styles.title3}>
                4.3 Sales Declaration and Collection of Payment
              </AppText>
              <AppText style={styles.paragraph1}>
                4.3.1 On a daily basis or at such other intervals as
                WARRANTYWISE may require as noted to the DEALER from time to
                time, the DEALER will use the DEALERNET booking facilities to
                send WARRANTYWISE copies of all application forms completed by
                the DEALER in respect of each WARRANTYWISE PLAN provided to a
                CUSTOMER during the TERM of this AGREEMENT.
              </AppText>
              <AppText style={styles.paragraph1}>
                4.3.2 WARRANTYWISE will prepare a report of the DEALER’S account
                as and when requested by the DEALER or at intervals as may be
                determined by WARRANTYWISE acting in its absolute discretion.
                The reports will contain details of the costs incurred in
                administering the WARRANTYWISE PLANS pursuant to the terms and
                conditions of this AGREEMENT, and shall include in particular
                details of all:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) repairs completed;
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) administration expenses;
              </AppText>
              <AppText style={styles.paragraph2}>
                (c) requests for repairs handling;
              </AppText>
              <AppText style={styles.paragraph2}>(d) payments made;</AppText>
              <AppText style={styles.paragraph2}>
                (e) deficits incurred; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (f) surpluses projected by WARRANTYWISE.
              </AppText>
              <AppText style={styles.paragraph1}>
                4.3.3 On a monthly basis or at such other intervals as
                WARRANTYWISE may require as noted to the DEALER from time to
                time, the DEALER shall pay WARRANTYWISE within 30 days of
                receipt of the report referred to in clause 4.3.2 the total
                amount of payments due by the due date (including VAT) and the
                DEALER shall either:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) forward cheque payment to WARRANTYWISE by post; or
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) pay WARRANTYWISE directly by BACS; or
              </AppText>
              <AppText style={styles.paragraph2}>
                (c) pay WARRANTYWISE by credit card or direct debit.
              </AppText>
              <AppText style={styles.paragraph1}>
                4.3.4 In the event that the DEALER’S account with WARRANTYWISE
                is in deficit, as referred to in clause 4.2 above, WARRANTYWISE
                shall notify the DEALER of the same in writing and following the
                service of this written notice on the DEALER:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) the DEALER shall have 30 days from the receipt of the
                written notice to agree a suitable method of redress in order to
                reach a position of settlement of the deficit balance with
                WARRANTYWISE. This redress may include without limitation the
                following:
              </AppText>
              <AppText style={styles.paragraph3}>
                (i) reducing the level of the SERVICES provided;
              </AppText>
              <AppText style={styles.paragraph3}>
                (ii) increasing the charges payable pursuant to 4.2; or
              </AppText>
              <AppText style={styles.paragraph3}>
                (iii) the DEALER paying a lump sum equal to the deficit in the
                DEALERS account with WARRANTYWISE; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) WARRANTYWISE will be entitled to cease performing the
                SERVICES with immediate effect should the DEALER’S account with
                WARRANTYWISE rem ain in a deficit situation for any continuous
                period of 90 days.
              </AppText>
              <AppText style={styles.paragraph1}>
                4.3.5 In the event that the DEALER does not comply with its
                oblig ations pursuant to clause 4.3.4(a) above, WARRANTYWISE
                will be entitled to terminate this AGREEMENT with immediate
                effect.
              </AppText>
              <AppText style={styles.title3}>
                4.4 Amendment of WARRANTYWISE PLAN
              </AppText>
              <AppText style={styles.paragraph1}>
                In the event that WARRANTYWISE wishes to make alterations to any
                future WARRANTYWISE PLAN terms it shall notify the DEALER of the
                proposed changes by providing 14 days’ notice of the same.
              </AppText>
              <AppText style={styles.title3}>4.5 Indemnity</AppText>
              <AppText style={styles.paragraph1}>
                4.5.1 The DEALER shall indemnify WARRANTYWISE against all
                liabilities, costs, expenses, damages and losses (including but
                not limited to any direct, indirect or consequential losses,
                loss of profit, loss of reputation and all interest, penalties
                and legal costs (calculated on a full indemnity basis) and all
                other reasonable professional costs and expenses) suffered or
                incurred by WARRANTYWISE arising out of or in connection with:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) the DEALER failing to settle its deficit balance with
                WARRANTYWISE pursuant to clause 4.3.4(a) above; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) the DEALER not meeting its liability obligations in relation
                to the respective WARRANTYWISE PLANS pursuant to clauses 1.5.5
                and 1.5.6 above.
              </AppText>
              <AppText style={styles.paragraph1}>
                4.5.2 Following the termination or expiry of this AGREEMENT this
                clause 4.5 shall remain in force.
              </AppText>
              <AppText style={styles.title2}>5 GENERAL</AppText>
              <AppText style={styles.paragraph1}>
                5.1.1 This AGREEMENT shall only apply in respect of repairs made
                to VEHICLES that have been accepted by WARRANTYWISE within the
                terms of the WARR ANTYWISE PLAN.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.1.2 The DEALER is responsible for completing a pre-sale
                inspection and servicing check (see 7.2.1) on behalf of
                WARRANTYWISE as required and in a format as provided herein in
                order to satisfy our requirements that the VEHICLE is:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) in a road worthy condition in line with the Road Traffic
                Act, Sale of Goods Act 1979, Sale and Supply of Goods to
                Consumer Regulations 2002 ; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) is free from any mechanical or electrical defects covered by
                the WARRANTYWISE PLAN; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (c) is not in need of any immediate servicing within the time
                and mileage recommended by the VEHICLE manufacturer or as
                outlined within the WARRANTYWISE PLAN; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (d) has at least 6 (six) months MOT remaining before the DEALER
                completes the sale of the VEHICLE to a CUSTOMER, and the DEALER
                shall complete, at its own cost, any rectification work that is
                necessary to meet these requirements before or after the sale of
                the VEHICLE.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.1.3 The DEALER shall not advertise, market or promote this
                AGREEMENT or WARRANTYWISE in any documentation or publication
                other than as authorised in writing by WARRANTYWISE.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.1.4 The DEALER should declare all material facts that may
                affect WARRANTYWISE’S decision to accept a VEHICLE within the
                context of this AGREEMENT for a WARRANTYWISE PLAN as requested
                by the DEALERNET booking system. Failure to disclose the correct
                information at the time of application for the WARRANTYWISE PLAN
                will be considered a breach of this AGREEMENT and WARRANTYWISE
                will be entitled to exercise its right to the terminate this
                AGREEMENT with immediate effect pursuant to clause 1.5.3 above.
                There are examples of VEHICLES which are considered as
                unacceptable detailed within the WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title3}>5.2 Geographical Limits</AppText>
              <AppText style={styles.paragraph1}>
                This AGREEMENT shall only apply to FAILURES that occur within
                the geographical limits specified in the WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title3}> 5.3 Sole Provider</AppText>
              <AppText style={styles.paragraph1}>
                The DEALER acknowledges that WARRANTYWISE will be the sole
                provider to the DEALER of the SERVICES and hereby agrees,
                subject to the rest of this AGREEMENT, to:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) not use any other provider to perform the SERVICES or any
                services which are materially similar to the SERVICES; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) utilise this AGREEMENT for all qualifying VEHICLES sold and
                not to enter into any other warranty that is not a WARRANTYWISE
                PLAN.
              </AppText>
              <AppText style={styles.title2}>5.4 Access and Inspection</AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE or their representatives shall have the right at
                all reasonable times to have access to inspect any VEHICLES that
                are the subject of a WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title2}>5.5 Subrogation</AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE may at any time at their expense use all legal
                means in the name of the DEALER of securing reimbursement for
                loss or damage and the DEALER shall give all reasonable
                assistance for this purpose.
              </AppText>
              <AppText style={styles.title2}>5.6 Observance</AppText>
              <AppText style={styles.paragraph1}>
                The due observance and fulfilment of the terms and conditions
                contained in this AGREEMENT and endorsed hereon (insofar as they
                relate to anything to be done or complied with by the DEALER)
                and the truth of the statements and answers in the proposal
                shall be conditions precedent to any liability of WARRANTYWISE
                to make any payment under this AGREEMENT.
              </AppText>
              <AppText style={styles.title2}>
                5.7 Contracts (Rights of Third Parties) Act 1999 Clause
              </AppText>
              <AppText style={styles.paragraph1}>
                A person who is not named in this contract has no rights under
                the Contracts (Rights of Third Parties) Act 1999 to enforce any
                term of this contract but this does not affect any right or
                remedy of a third party which exists or is available apart from
                that Act.
              </AppText>
              <AppText style={styles.title2}>5.8 Law and jurisdiction</AppText>
              <AppText style={styles.paragraph1}>
                5.8.1 This AGREEMENT and any non-contractual obligations arising
                out of or in connection with it will be governed by the law of
                England and Wales.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.8.2 The courts of England and Wales have exclusive
                jurisdiction to determine any dispute arising out of or in
                connection with this AGREEMENT (including in relation to any
                non-contractual obligations).
              </AppText>
              <AppText style={styles.paragraph1}>
                5.8.3 Nothing in this clause 5.8 will prevent or restrict the
                right of a party to seek injunctive relief or specific
                performance or other discretionary remedies of the court .
              </AppText>
              <AppText style={styles.title2}>5.9 Data Protection</AppText>
              <AppText style={styles.paragraph1}>
                5.9.1 The terms “Data Subject”, “Personal Data”, “Process”,
                “Processed”, “Processing”, “Data Controller” or “Data
                Processor”, where capitalised, shall have the meanings in, and
                shall be interpreted in accordance with, the Data Protection
                Legislation.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.9.2 The provisions of this clause 5.9 shall apply if and to
                the extent that one party (the “Processor”) processes Personal
                Data in respect of which the other party is (the “Controller”).
                Any such data shall be referred to as the “Agreement Personal
                Data”. For the avoidance of doubt, each party is a Data
                Controller in its own right in the course of its own business.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.9.3 In addition to and notwithstanding any other right or
                obligation arising under this Agreement, the Processor will and
                will procure that all subcontractors and third parties that
                Process the relevant Personal Data on behalf of the Processor
                (“Authorised Sub-Processors”) will, with respect to all
                Agreement Personal Data: a. Process the Agreement Personal Data
                only on documented instructions from the Controller including
                this Agreement;
              </AppText>
              <AppText style={styles.paragraph2}>
                b. without prejudice to clause 5.9.3 (a) above, shall ensure
                that Agreement Personal Data will only be used to the extent
                required to provide the Services. The Processor shall not
                without the express prior written consent of the Controller (a)
                convert any Agreement Personal Data into anonymised,
                pseudonymised, depersonalised, aggregated or statistical data;
                (b) use any Agreement Personal Data for “big data” analysis or
                purposes; or (c) match any Agreement Personal Data with or
                against any other Personal Data (whether Processor’s or any
                third party’s);
              </AppText>
              <AppText style={styles.paragraph2}>
                c. not permit any Processing of Agreement Personal Data outside
                the European Economic Area without the Controller’s prior
                written consent which may be subject to conditions at the
                Controller’s discretion (unless the Processor or Authorised
                Sub-Processors are required to transfer the Agreement Personal
                Data, to comply with European Union or European Member State
                applicable laws and such laws prohibit notice to the Controller
                on public interest grounds);
              </AppText>
              <AppText style={styles.paragraph2}>
                d. ensure that any person authorised to Process the Agreement
                Personal Data:
              </AppText>
              <AppText style={styles.paragraph3}>
                have committed themselves to confidentiality obligations or are
                under an appropriate statutory obligation of confidentiality;
              </AppText>
              <AppText style={styles.paragraph3}>
                Processes the Agreement Personal Data solely on written
                instructions from the Controller; and
              </AppText>
              <AppText style={styles.paragraph3}>
                are appropriately reliable, qualified and trained in relation to
                their Processing of Agreement Personal Data;
              </AppText>
              <AppText style={styles.paragraph2}>
                a. implement (and assist the Controller to implement) technical
                and organisational measures to ensure a level of security
                appropriate to the risk presented by Processing the Agreement
                Personal Data, in particular from accidental or unlawful
                destruction, loss, alteration, unauthorised disclosure of, or
                access to personal data transmitted, stored or otherwise
                Processed (together, a “Data Security Incident”);
              </AppText>
              <AppText style={styles.paragraph2}>
                b. notify the Controller without undue delay (an in any event no
                later than 24 hours) after becoming aware of a reasonably
                suspected, “near miss” or actual Data Security Incident. Where,
                and in so far as, it is not possible to provide the information
                at the same time, the information may be provided in phases
                without undue further delay, and for the avoidance of doubt, the
                Processor and Authorised Sub-Processor may not delay
                notification under this clause 5.9.3 (f) on the basis that an
                investigation is incomplete of ongoing, and not make or permit
                any announcement to any party, without the Controller’s consent,
                which may be subject to conditions at the Controller’s sole
                discretion;
              </AppText>
              <AppText style={styles.paragraph2}>
                c. provide reasonable assistance to the Controller in:
              </AppText>
              <AppText style={styles.paragraph3}>
                responding to requests for exercising the Data Subject's rights
                under the Data Protection Legislation, including by appropriate
                technical and organisational measures, insofar as this is
                possible;
              </AppText>
              <AppText style={styles.paragraph3}>
                reporting any Data Security Incident to any supervisory
                authority or Data Subjects and documenting any data security
                Breaches;
              </AppText>
              <AppText style={styles.paragraph3}>
                taking measure to address the Data Security Breach, including,
                where appropriate, measures to mitigate its possible adverse
                effects; and
              </AppText>
              <AppText style={styles.paragraph3}>
                conducting privacy impact assessments of any Processing
                operations and consulting with any applicable supervisory
                authority or appropriate persons accordingly;
              </AppText>
              <AppText style={styles.paragraph2}>
                d. at the choice of the Controller securely delete or return all
                Agreement Personal Data to the Controller after the end of the
                provision of services relating to Processing, and securely
                delete any remaining copies;
              </AppText>
              <AppText style={styles.paragraph2}>
                e. hold Agreement Personal Data physically and electronically
                separate to any other records or Personal Data, Processed by the
                Processor or Authorised Sub-Processor other than for the
                performance of the Services.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.9.4 The Processor shall make available to the Controller all
                information necessary to demonstrate compliance with the
                obligations in respect of Agreement Personal Data laid down in
                this clause 5.9 and allow for and contribute to audits,
                including inspections, conducted by the Controller or another
                auditor mandated by the Controller. The Processor shall
                immediately inform the Controller if, in its opinion, an
                instruction infringes this Regulation or other Union or Member
                State data protection provisions.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.9.5 Where either Party acts in the capacity of Controller, it
                shall comply at all times with its obligations under the Data
                Protection Legislation.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.9.6 Where either Party acts as a Data Controller in common
                (the “Collaborator”) with the other Party (the “Controller in
                Common”) in relation to Customer Data provided by the Controller
                in Common and which has been re-collected/re-confirmed by the
                Collaborator, the Collaborator shall comply at all times with
                the Data Protection Legislation and shall not by any act or
                omission cause the Controller in Common to be in breach. The
                Collaborator shall immediately notify the Controller in Common
                in the event it becomes aware of any actual, probable or
                threatened incident of accidental or unlawful destruction or
                accidental loss, alteration, unauthorised or accidental
                disclosure of or access or breach of clause 5.9.3 which impacts
                any data provided by the Controller in Common to the
                Collaborator in connection with this Agreement and shall:
              </AppText>
              <AppText style={styles.paragraph2}>
                I. provide the Controller in Common with all information in
                relation to the breach and assistance as may be required in
                order for the Controller in Common to seek to mitigate the
                effects of the breach, comply with the Data Protection
                Legislation and adhere to guidance issued by the ICO with regard
                to security breach management and reporting; II. implement any
                measures necessary to restore the security of any compromised
                data;
              </AppText>
              <AppText style={styles.paragraph2}>
                III. work with the Controller in Common to make any required
                notifications to the ICO and affected Data Subjects in
                accordance with applicable law and regulation; and
              </AppText>
              <AppText style={styles.paragraph2}>
                IV. not do anything which may damage the reputation of the
                Controller in Common or the Controller in Common’s relationship
                with the relevant Customer, save as required by applicable law
                and regulation.
              </AppText>
              <AppText style={styles.paragraph2}>
                V. on request, provide such information and assistance as is
                reasonably requested by the Controller in Common to assist the
                Controller in Common in complying with the Data Protection
                Legislation in respect of Customer Data provided under the
                Agreement.
              </AppText>
              <AppText style={styles.title3}>5.10 Language</AppText>
              <AppText style={styles.paragraph1}>
                All documents and all communications about this AGREEMENT will
                be in easy to understand English. No language other than English
                will be used. Any words relating to the male gender shall also
                refer to the female gender and vice -versa.
              </AppText>
              <AppText style={styles.title3}>
                5.11 Section Headings and Numbering
              </AppText>
              <AppText style={styles.paragraph1}>
                The headings and numbering of this AGREEMENT are for convenience
                only and shall not affect the construction thereof.
              </AppText>
              <AppText style={styles.title3}>5.12 Notices</AppText>
              <AppText style={styles.paragraph1}>
                5.12.1 Any notices required to be given to the DEALER under the
                terms of this AGREEMENT shall be forwarded to WARRANTYWISE’S
                registered office address listed in clause 1.8.5 address above
                by Special/Recorded Delivery Post and will be deemed to have
                been received by the DEALER within 3 working days from the date
                of posting.
              </AppText>
              <AppText style={styles.paragraph1}>
                5.12.2 Any notices required to be given to WARRANTYWISE under
                the terms of this AGREEMENT shall be forwarded to WARRANTYWISE’S
                registered office address listed in clause 1.8.5 address above
                by Special/Recorded Delivery Post and will be deemed to have
                been received by WARRANTYWISE within 3 working days from the
                date of posting.
              </AppText>
              <AppText style={styles.title3}>5.13 Statute References</AppText>
              <AppText style={styles.paragraph1}>
                References to any statute or statutory provision will include
                any subordinate legislation made under it and will be construed
                as references to such statute, statutory provision and/or
                subordinate legislation as modified, amended, extended,
                consolidated, re - enacted and/or replaced and in force from
                time to time.
              </AppText>

              <AppText style={styles.title2}>
                6. REPAIRS NOTIFICATION AND REQUIREMENTS
              </AppText>
              <AppText style={styles.title3}>6.1 Repairs Authority</AppText>
              <AppText style={styles.paragraph1}>
                6.1.1 WARRANTYWISE has the authority to act in its absolute
                discretion to handle, negotiate and decline or accept any
                request for repairs made under any WARRANTYWISE PLAN issued by
                the DEALER during the period of this AGREEMENT and any
                WARRANTYWISE PLANS issued pursuant to it.
              </AppText>
              <AppText style={styles.paragraph1}>
                6.1.2 The DEALER accepts that any repairs which are not
                authorised by WARRANTYWISE will not be covered under the terms
                of this AGREEMENT or any WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title3}>6.2 Repairs Notification</AppText>
              <AppText style={styles.paragraph1}>
                Any repairs notified directly by a CUSTOMER to the DEALER should
                be immediately referred to WARRANTYWISE.
              </AppText>
              <AppText style={styles.title3}>
                6.3 Repairs Administration
              </AppText>
              <AppText style={styles.paragraph1}>
                6.3.1 WARRANTYWISE will use its reasonable endeavours to obtain
                the most cost effective settlement for each valid repair either
                directly with the CUSTOMER or with the CUSTOMER’S chosen
                repairer or with a repairer selected by WARRANTYWISE .
              </AppText>
              <AppText style={styles.paragraph1}>
                6.3.2 In the ordinary course of business and in each event
                where;
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) a request for repairs is made by a CUSTOMER and administered
                by WARRANTYWISE; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) settlement is made in full, in part or declined by
                WARRANTYWISE then; WARRANTYWISE will charge the full cost of
                such repairs together with all associated expenses including
                WARRANTYWISE’S charges and administration expenses to the
                DEALER’S account.
              </AppText>
              <AppText style={styles.paragraph1}>
                6.3.3 Where WARRANTYWISE declines a repair claim or part thereof
                under the terms of the WARRANTYWISE PLAN, the remaining
                liability (if any) will rest with the DEALER.
              </AppText>
              <AppText style={styles.title3}>6.4 Repairs Assistance</AppText>
              <AppText style={styles.paragraph1}>
                The DEALER shall provide all reasonable assistance to
                WARRANTYWISE in investigating and/or negotiating any repairs
                made pursuant to a WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title2}>7. Miscellaneous</AppText>
              <AppText style={styles.title3}>7.1 WARRANTYWISE PLAN</AppText>
              <AppText style={styles.paragraph1}>
                The latest version of the standard WARRANTYWISE PLAN is
                available in booklet format at each WARRANTYWISE office or is
                available for download on the following website:
                www.warrantywise.co.uk/downloads.
              </AppText>
              <AppText style={styles.title3}>
                7.2 Pre WARRANTYWISE PLAN checks
              </AppText>
              <AppText style={styles.paragraph1}>
                7.2.1 Prior to the issue of a WARRANTYWISE PLAN the DEALER is
                required to ensure the following:
              </AppText>
              <AppText style={styles.paragraph2}>
                (a) A pre-sale inspection is carried out to ensure that t he
                VEHICLE is ready for sale as required by the Road Traffic Act
                1991, Sale of Goods Act 1979 and Sale and Supply of Goods to
                Consumer Regulations 2002. A pre-delivery inspection should be
                carried out by a qualified engineer to ensure there are no
                obvious mechanical or electrical faults apparent. Any faults
                discovered should be repaired at the DEALER’S expense; and
              </AppText>
              <AppText style={styles.paragraph2}>
                (b) the VEHICLE has received the servicing as detailed within
                the WARRANTYWISE PLAN and proof must be made available to the
                CUSTOMER that this servicing has been carried out previously or
                by the DEALER or a VAT registered garage.
              </AppText>
              <AppText style={styles.paragraph1}>
                7.2.2 If the previous servicing as required within the terms of
                the WARRANTYWISE PLAN has not been completed then the DEALER
                must complete the required servicing and bring the VEHICLE’S
                servicing up to date at its own expense or inform his CUSTOMER
                ‘in writing’ (preferably on the sales invoice) that the
                servicing must be completed and brought up to date by the
                CUSTOMER before the WARRANTYWISE PLAN will become effective.
              </AppText>
              <AppText style={styles.title3}>7.3 Important</AppText>
              <AppText style={styles.paragraph1}>
                You will be required to inform each CUSTOMER of the terms and
                conditions (and in particular the servicing requirements) of the
                WARRANTYWISE PLAN prior to each CUSTOMER entering into a
                WARRANTYWISE PLAN.
              </AppText>
              <AppText style={styles.title1}>SCHEDULE</AppText>
              <AppText style={styles.title2}>Services</AppText>
              <AppText style={styles.paragraph1}>
                WARRANTYWISE will manage the costs of administering, repairing
                and rectifying mechanical and electrical breakdowns (together,
                the FAILURES) that occur to motor vehicles (VEHICLES) sold by
                you (the DEALER) to your customers (each, a CUSTOMER) under the
                terms of warranties (WARRANTYWISE PLANS) i ssued by you during
                the term of this AGREEMENT.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.2 In particular, WARRANTYWISE will, at its discretion, use
                reasonable endeavours to provide the following services to the
                DEALER:
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.1 provide any CUSTOMER documentation required pursuant to
                the terms of this AGREEMENT or any WARRANTYWISE PLAN within 7
                days of receiving a request via DEALERNET for the same from the
                DEALER;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.2 offer CUSTOMERS the option to upgrade/change as detailed
                in the WARRANTYWISE PLANS;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.3 offer any CUSTOMER the 30 day cooling off period as
                detailed in the WARRANTYWISE PLANS;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.4 process all repairs that have been authorised by
                WARRANTYWISE pursuant to the terms and conditions of this
                AGREEMENT in accordance with the Repairs Procedure of the
                WARRANTYWISE PLANS;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.5 ensure that any decisions made by WARRANTYWISE in
                accordance with the terms and conditions of this AGREEMENT are
                administered in accordance with the WARRANTYWISE PLANS;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.6 provide suitable independent inspections as detailed in
                the WARRANTYWISE PLANS;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.7 provide detailed reports as noted in the AGREEMENT
                paragraph 4.3.2;
              </AppText>
              <AppText style={styles.paragraph2}>
                1.2.8 provide suitable merchandising materials as may be
                necessary for the DEALER to promote their association with
                WARRANTYWISE from time to time and, as appropriate, based on
                VEHICLE stock levels and WARRANTY PLANS purchased; together, the
                SERVICES.
              </AppText>
              <AppText style={styles.title1}>MARKETING MATERIALS</AppText>
              <AppText style={styles.paragraph1}>
                1.1 Marketing materials provided to DEALER, as detailed and
                available to purchase via the DEALERNET store. Current materials
                and prices are noted therein.
              </AppText>
              <AppText style={styles.paragraph1}>
                1.2 Where such Marketing materials are provided free of charge
                or purchased using accumulated WisePoints (as defined in the
                DEALERNET store), these remain the property of WARRANTYWISE and
                are valued at the prices noted on the DEALERNET store.
                .block-content.block-content-full.text-right.bg-light
              </AppText>
            </ScrollView>
          </View>
        </Screen>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.white + "aa",
  },
  container: {
    backgroundColor: "white",
    margin: 10,
    flex: 1,
    borderRadius: 10,
    ...defaultStyles.shadow,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingTop: 20,
  },
  title1: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 18,
    color: colors.secondary,
  },
  title2: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 16,
  },
  title3: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph1: {
    marginBottom: 20,
  },
  paragraph2: {
    marginBottom: 20,
    fontStyle: "italic",
    marginLeft: 20,
  },
  paragraph3: {
    marginBottom: 20,
    fontStyle: "italic",
    marginLeft: 40,
  },
});

export default Terms;
