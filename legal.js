// ─────────────────────────────────────────────────────────────────────────────
// legal.js — Editable legal text for Flashcard Reader
//
// Each section is a plain HTML string.  Edit the text between the backticks.
// Allowed tags: <h3>, <p>, <ul>, <li>, <strong>, <a href="...">
// The <p class="legal-effective"> line sets the "Last updated" date shown at
// the top of each document.
// ─────────────────────────────────────────────────────────────────────────────

export const LEGAL_CONTENT = {

  // ── Terms of Use ────────────────────────────────────────────────────────────
  terms: `
    <p class="legal-effective">Last updated: May 2026</p>

    <h3>1. Acceptance</h3>
    <p>By accessing or using the Flashcard Reader ("the Service"), you agree to be
    bound by these Terms of Use. If you do not agree, please do not use the
    Service.</p>

    <h3>2. Description of Service</h3>
    <p>The Flashcard Reader is an open-source Korean vocabulary learning application
    available under the MIT License. The app uses local browser storage, requires no
    login, and presents vocabulary words linked to places of interest in Seoul and the
    Seoul Metro System. Its source code is publicly available; teachers and educational
    institutions may self-host their own instances under the terms of the MIT License.</p>

    <h3>3. Eligibility</h3>
    <p>You must be at least 16 years old to use the Service. By using the
    Service, you represent that you meet this age requirement. If you are
    between 13 and 15 years old, you may only use the Service with the
    involvement and consent of a parent or guardian.</p>

    <h3>4. Account Access</h3>
    <p>No account registration is required, no login is needed, and operators
    do not have access to your data.</p>

    <h3>5. Your Data</h3>
    <p>You retain ownership of all vocabulary data you create. Your learning
    progress, notes, and preferences are stored locally in your browser only
    and are never transmitted to our servers.</p>

    <h3>6. Acceptable Use</h3>
    <p>Modification and redistribution of the Flashcard Reader source code is
    expressly permitted under the terms of the MIT License set out in the Open
    Source &amp; Licensing tab. You agree not to: (a) use the Service for any
    unlawful purpose; (b) attempt to gain unauthorised access to the Service or
    its infrastructure.</p>

    <h3>7. Intellectual Property</h3>
    <p>The Flashcard Reader is open-source software available under the MIT
    License. Sample vocabulary content is provided for demonstration and
    educational purposes only. Pre-generated map tile data is not developer IP;
    any tile data used in a deployment is subject to its own upstream licence.</p>

    <h3>8. Teacher &amp; Self-Hoster Rights</h3>
    <p>Teachers and educational institutions may:</p>
    <ul>
      <li>Self-host their own instances of the Flashcard Reader.</li>
      <li>Modify the Flashcard Reader source code under the terms of the MIT License.</li>
      <li>Deploy branded or adapted versions of the Flashcard Reader for educational use.</li>
    </ul>

    <h3>9. Teacher &amp; Self-Hoster Responsibilities</h3>
    <p>Any party that self-hosts or deploys the Flashcard Reader is <strong>solely
    responsible</strong> for:</p>
    <ul>
      <li>All content, vocabulary data, media, and routes within their deployment.</li>
      <li>All user and student data processed by their deployment.</li>
      <li>Compliance with all applicable laws and privacy regulations (including GDPR,
      POPIA, or equivalent) in their jurisdiction.</li>
      <li>Including correctly licensed, pre-generated map tile bundles in their
      deployment package.</li>
      <li>Ensuring compliance with any upstream data licensing that applies to those tile
      bundles (including the OpenStreetMap Open Database License (ODbL) where applicable).</li>
      <li>Displaying any required attribution in their deployed instance, including
      <strong>© OpenStreetMap contributors</strong> where OSM-derived tiles are used.</li>
      <li>Preserving the MIT copyright notice and licence text in any copy, modification,
      or fork of the Flashcard Reader.</li>
    </ul>

    <h3>10. Map Tile Bundles</h3>
    <p>The Flashcard Reader does <strong>not</strong> fetch map tiles from external
    providers at runtime. Map tiles are pre-generated and bundled as discrete asset
    packages that must be included in each deployment separately. Tile bundles are not
    stored in the code repository and are not hosted, served, or maintained by the
    developer.</p>
    <p>The developer may provide tooling or build-pipeline guidance to assist in
    generating tile bundles but does not operate a hosted mapping service of any kind.
    All licensing compliance for tile bundles — including any obligations arising from
    the OpenStreetMap ODbL — is the sole responsibility of the deploying teacher or
    institution.</p>

    <h3>11. User-Generated Content and File Sharing</h3>
    <p>The Service provides tools that allow users to create, curate, import, export,
    and share custom vocabulary lists, routes, and associated content
    ("User-Generated Content"):</p>
    <ul>
      <li><strong>Sole responsibility</strong> — you are solely responsible for any
      User-Generated Content you create and for ensuring it complies with all applicable
      laws and does not infringe the rights of any third party.</li>
      <li><strong>Peer-to-peer sharing</strong> — the export and sharing of files between
      users occurs entirely outside the Service and outside the control of the developer,
      in a manner analogous to a user creating and distributing a document independently.
      The developer has no visibility into, and exercises no moderation or oversight over,
      any such transfers.</li>
      <li><strong>No developer liability</strong> — the developer accepts no responsibility
      for the accuracy, legality, appropriateness, or any consequences arising from
      User-Generated Content created, exported, or shared by any user.</li>
      <li><strong>Indemnity</strong> — you agree to indemnify and hold harmless the
      developer from any claim, loss, or expense arising from User-Generated Content you
      create or distribute, or from your deployment of the Flashcard Reader.</li>
    </ul>

    <h3>12. Third-Party Operators</h3>
    <p>The Service's word lists, routes, word games, and linked content are
    provided by third-party operators and are not controlled by the developer.
    The developer is not responsible for the accuracy or reliability of such
    content.</p>
    <p>The app may be re-branded by each third party.
    <span data-brand="operator-name">Flashcard Fluency Routes</span> accepts
    no liability for any direct, indirect, incidental, special, consequential,
    or punitive damages arising out of your use of or inability to use the
    Service.</p>

    <h3>13. Disclaimers</h3>
    <p>The Service is provided "as is" without warranties of any kind. We do
    not guarantee uninterrupted access or error-free operation.</p>

    <h3>14. Limitation of Liability</h3>
    <p>To the maximum extent permitted by applicable law,
    <span data-brand="operator-name">Flashcard Fluency Routes</span>
    accepts no liability for any direct, indirect, incidental, special,
    consequential, or punitive damages arising out of your use of or inability
    to use the Service. In no event shall
    <span data-brand="operator-name">Flashcard Fluency Routes</span> be liable for any
    claim arising from use of the Service, from a self-hosted Flashcard Reader
    deployment, any modification of the Flashcard Reader, or any tile bundle
    used or generated by a third party.</p>

    <h3>15. Changes to Terms</h3>
    <p>We may update these Terms at any time. Continued use of the Service
    after changes are posted constitutes acceptance of the revised Terms.</p>

    <h3>16. Contact</h3>
    <p>For questions regarding these Terms, please contact
    <span data-brand="operator-name">Flashcard Fluency Routes</span> at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>
  `,

  // ── Privacy Policy ──────────────────────────────────────────────────────────
  privacy: `
    <p class="legal-effective">Last updated: May 2026</p>

    <h3>1. Scope of This Policy</h3>
    <p>This Privacy Policy covers only systems and instances <strong>operated directly
    by the developer</strong>. The Flashcard Reader is open-source software that may be
    self-hosted by teachers, institutions, or other third parties. Self-hosted deployments
    operate entirely outside the developer's control and are <strong>not</strong> covered
    by this policy. The party that operates a self-hosted deployment is the data
    controller for that instance and is solely responsible for its own privacy practices
    and legal compliance.</p>

    <h3>2. Self-Hosted Deployments</h3>
    <p>When the Flashcard Reader is deployed by a teacher, institution, or other third
    party:</p>
    <ul>
      <li>The hosting party is the sole data controller for that deployment.</li>
      <li>The developer does not collect, access, process, or retain any data from
      self-hosted instances.</li>
      <li>Compliance with applicable privacy laws (including GDPR, POPIA, or equivalent)
      is the hosting party's sole responsibility.</li>
      <li>Users of a self-hosted instance should consult the privacy policy published by
      the operator of that deployment.</li>
    </ul>

    <h3>3. What We Collect</h3>
    <ul>
      <li><strong>Personal information</strong> — No personal information
      (name, email address, or account details) is collected or stored by
      <span data-brand="operator-name">Flashcard Fluency Routes</span>.</li>
      <li><strong>Learning data</strong> — Your learning progress, scores,
      personal notes, and preferences are stored exclusively in your
      browser's local storage (IndexedDB). This data never leaves your
      device and <span data-brand="operator-name">Flashcard Fluency Routes</span> has no access to it.</li>
      <li><strong>Infrastructure metadata</strong> — As a standard function
      of CDN delivery, our hosting provider (Cloudflare) logs request
      metadata including IP address, browser type, and requested URL.
      This is handled by Cloudflare as a data processor and is used solely
      for security and infrastructure purposes.
      <span data-brand="operator-name">Flashcard Fluency Routes</span> does not
      receive or store this data.</li>
    </ul>

    <h3>4. What We Do Not Collect</h3>
    <p>We do not collect passwords, cookies, browsing history, or analytics
    data. We do not run tracking pixels, behavioural advertising, or user
    profiling. No user accounts are required or created.</p>

    <h3>5. Third-Party Services</h3>
    <ul>
      <li><strong>Cloudflare</strong> — hosting, CDN, and static file
      delivery. Acts as a data processor for standard request logs.
      (<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">cloudflare.com/privacypolicy</a>)</li>
      <li><strong>Map Tiles</strong> — the Flashcard Reader renders maps using pre-packaged
      tile bundles included in each deployment. It does <strong>not</strong> make runtime
      requests to OpenStreetMap or any external tile provider. No user data is transmitted
      to mapping services by the Flashcard Reader. Self-hosters are responsible for the
      licensing of any tile data they bundle and must display
      © OpenStreetMap contributors in any deployment using OSM-derived tiles.
      (<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">openstreetmap.org/copyright</a>)</li>
      <li><strong>YouTube (Google LLC)</strong> — some flashcards include
      optional embedded videos. If you choose to play a video, your request
      is sent directly to YouTube and Google's privacy policy applies.
      No video content is loaded until you actively play it.
      (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>)</li>
      <li><strong>Feather Icons</strong> — open-source icon library served
      locally; no data is sent to Feather servers.</li>
    </ul>

    <h3>6. Exported and Shared Files</h3>
    <p>The Service allows users to export vocabulary lists and routes as files and share
    them directly with other users. Once a file has been exported from the Service, any
    onward transfer, storage, or publication of that file occurs entirely outside the
    platform and beyond the developer's control or knowledge. The developer accepts no
    responsibility for the content or distribution of any such exported files.</p>

    <h3>7. Data Retention</h3>
    <p><span data-brand="operator-name">Flashcard Fluency Routes</span> holds no server-side user data and therefore has no
    retention period to define. All your learning data is stored locally
    in your browser until you clear it. You can permanently delete all
    local data at any time using the "Clear Memory &amp; Exit" option in
    the Data Management panel.</p>

    <h3>8. Your Rights</h3>
    <p>Because all your data is stored locally in your browser, you have
    direct control over it at all times:</p>
    <ul>
      <li><strong>Access</strong> — your data is in your browser's local
      storage and is never held on external servers.</li>
      <li><strong>Delete local data</strong> — use "Clear Memory &amp; Exit"
      in the Data Management panel to permanently wipe all local browser
      data for this app.</li>
      <li><strong>Portability</strong> — use the export function in the Data
      Management panel to download your data.</li>
    </ul>

    <h3>9. Rights for EU Users (GDPR)</h3>
    <p>If you are located in the European Union or European Economic Area,
    the General Data Protection Regulation (GDPR) applies to the processing
    of your personal data by our infrastructure provider. You have the
    following rights:</p>
    <ul>
      <li><strong>Right of access</strong> (Article 15) — you may request
      confirmation of what personal data is held about you.</li>
      <li><strong>Right to rectification</strong> (Article 16) — you may
      request correction of inaccurate data.</li>
      <li><strong>Right to erasure</strong> (Article 17) — you may request
      deletion of your personal data.</li>
      <li><strong>Right to restriction of processing</strong>
      (Article 18).</li>
      <li><strong>Right to data portability</strong> (Article 20).</li>
      <li><strong>Right to object</strong> (Article 21) — you may object
      to processing based on legitimate interests.</li>
      <li><strong>Right to lodge a complaint</strong> — you have the right
      to lodge a complaint with the supervisory authority in your EU member
      state.</li>
    </ul>
    <p>The lawful basis for Cloudflare's processing of infrastructure
    metadata is <strong>legitimate interests</strong> (Article 6(1)(f)) —
    specifically the legitimate interest in securing and delivering the
    Service. To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>10. Rights for UK Users (UK GDPR)</h3>
    <p>If you are located in the United Kingdom, the UK General Data
    Protection Regulation (UK GDPR) applies. Your rights mirror those
    of EU users listed above, including the rights of access,
    rectification, erasure, restriction, portability, and objection.
    The lawful basis for Cloudflare's processing of infrastructure
    metadata is <strong>legitimate interests</strong>. You have the
    right to lodge a complaint with the
    <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">Information Commissioner's Office (ICO)</a>.
    To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>11. Rights for South African Users (POPIA)</h3>
    <p>If you are located in South Africa, the Protection of Personal
    Information Act (POPIA) applies. You have the right to:</p>
    <ul>
      <li>Be notified that your personal information is being collected
      (this notice fulfils that obligation).</li>
      <li>Access your personal information.</li>
      <li>Request correction or deletion of your personal information.</li>
      <li>Object to the processing of your personal information.</li>
      <li>Submit a complaint to the Information Regulator of South Africa
      at <a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener">justice.gov.za/inforeg</a>.</li>
    </ul>
    <p>To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>12. Rights for California Residents (CCPA/CPRA)</h3>
    <p>If you are a California resident, the California Consumer Privacy
    Act (CCPA) and California Privacy Rights Act (CPRA) grant you the
    following rights:</p>
    <ul>
      <li><strong>Right to know</strong> — the right to know what personal
      information is collected, used, or disclosed about you. This
      privacy policy fulfils that disclosure obligation.</li>
      <li><strong>Right to delete</strong> — the right to request deletion
      of your personal information. Because
      <span data-brand="operator-name">Flashcard Fluency Routes</span> holds no
      server-side user data, all deletion is performed locally via
      "Clear Memory &amp; Exit" in the Data Management panel.</li>
      <li><strong>Right to opt out of sale or sharing</strong> — we do not
      sell or share personal information. No opt-out mechanism is
      required.</li>
      <li><strong>Right to non-discrimination</strong> — you will not be
      discriminated against for exercising any of these rights.</li>
    </ul>
    <p>To submit a privacy request, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.
    You may also contact the
    <a href="https://cppa.ca.gov/" target="_blank" rel="noopener">California Privacy Protection Agency (CPPA)</a>
    with any complaints.</p>

    <h3>13. Rights for South Korean Users (PIPA)</h3>
    <p>If you are located in South Korea, the Personal Information
    Protection Act (PIPA / 개인정보 보호법) applies. You have the right
    to:</p>
    <ul>
      <li>Access, correct, and delete your personal information.</li>
      <li>Suspend processing of your personal information.</li>
      <li>Withdraw consent to processing (where consent is the lawful
      basis; here, our basis is legitimate interests for CDN
      infrastructure).</li>
      <li>Lodge a complaint with the
      <a href="https://www.pipc.go.kr/" target="_blank" rel="noopener">Personal Information Protection Commission (PIPC)</a>
      or seek dispute mediation through the Privacy Dispute Mediation
      Committee.</li>
    </ul>
    <p>To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>14. Rights for Brazilian Users (LGPD)</h3>
    <p>If you are located in Brazil, the Lei Geral de Proteção de Dados
    (LGPD) applies. You have the right to:</p>
    <ul>
      <li>Confirmation of the existence of processing and access to your
      personal data.</li>
      <li>Correction of incomplete, inaccurate, or outdated data.</li>
      <li>Anonymisation, blocking, or deletion of unnecessary or
      excessive data.</li>
      <li>Data portability.</li>
      <li>Deletion of personal data processed with your consent.</li>
      <li>Information about third parties with whom data is shared.</li>
      <li>Objection to processing based on legitimate interests where
      it does not comply with the LGPD.</li>
      <li>Lodge a complaint with the
      <a href="https://www.gov.br/anpd/" target="_blank" rel="noopener">Autoridade Nacional de Proteção de Dados (ANPD)</a>.</li>
    </ul>
    <p>The lawful basis for Cloudflare's processing of infrastructure
    metadata is <strong>legitimate interests</strong> (Article 7(IX)).
    To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>15. Rights for Canadian Users (PIPEDA / Quebec Law 25)</h3>
    <p>If you are located in Canada, the Personal Information Protection
    and Electronic Documents Act (PIPEDA) and, for Quebec residents,
    Law 25 (Act respecting the protection of personal information in
    the private sector) apply. You have the right to:</p>
    <ul>
      <li>Know what personal information is held about you and how it
      is used.</li>
      <li>Access and challenge the accuracy of your personal
      information.</li>
      <li>Withdraw consent to collection and use (where consent is the
      basis for processing).</li>
      <li>Lodge a complaint with the
      <a href="https://www.priv.gc.ca/" target="_blank" rel="noopener">Office of the Privacy Commissioner of Canada (OPC)</a>
      or, for Quebec residents, the
      <a href="https://www.cai.gouv.qc.ca/" target="_blank" rel="noopener">Commission d'accès à l'information (CAI)</a>.</li>
    </ul>
    <p>To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>16. Rights for Japanese Users (APPI)</h3>
    <p>If you are located in Japan, the Act on the Protection of
    Personal Information (APPI / 個人情報の保護に関する法律) applies.
    You have the right to:</p>
    <ul>
      <li>Request disclosure of your retained personal information.</li>
      <li>Request correction, addition, or deletion of your personal
      information.</li>
      <li>Request suspension of use or erasure of personal information
      handled in violation of the APPI.</li>
      <li>Lodge a complaint with the
      <a href="https://www.ppc.go.jp/" target="_blank" rel="noopener">Personal Information Protection Commission (PPC)</a>.</li>
    </ul>
    <p>To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>17. Rights for Australian Users (Privacy Act)</h3>
    <p>If you are located in Australia, the Privacy Act 1988 and the
    Australian Privacy Principles (APPs) apply. You have the right
    to:</p>
    <ul>
      <li>Know why your personal information is being collected and how
      it will be used (this policy fulfils that obligation).</li>
      <li>Access your personal information held by
      <span data-brand="operator-name">Flashcard Fluency Routes</span>.
      Because <span data-brand="operator-name">Flashcard Fluency Routes</span> holds no server-side user data, all access
      is via your browser's local storage.</li>
      <li>Request correction of any personal information that is
      inaccurate, out of date, incomplete, or misleading.</li>
      <li>Lodge a privacy complaint with the
      <a href="https://www.oaic.gov.au/privacy/privacy-complaints" target="_blank" rel="noopener">Office of the Australian Information Commissioner (OAIC)</a>.</li>
    </ul>
    <p>To exercise any of these rights, contact us at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>

    <h3>18. International Transfers</h3>
    <p>Infrastructure is hosted on Cloudflare's global network, and request
    metadata may be processed outside your country of residence. Cloudflare
    complies with international data transfer requirements through Standard
    Contractual Clauses (SCCs) approved by the European Commission. For
    details, see Cloudflare's
    <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noopener">Data Processing Addendum</a>.</p>

    <h3>19. Contact</h3>
    <p>For privacy-related requests, data enquiries, or to exercise any of
    the rights listed above, please contact
    <span data-brand="operator-name">Flashcard Fluency Routes</span> at
    <a data-brand="operator-privacy-email" href="mailto:info@flashcardfluencyroutes.com">info@flashcardfluencyroutes.com</a>.</p>
  `,

  // ── Disclaimer ──────────────────────────────────────────────────────────────
  disclaimer: `
    <p class="legal-effective">Last updated: May 2026</p>

    <h3>Educational Use Only</h3>
    <p>The Flashcard Reader is provided as a personal productivity and
    educational reference tool. It is not a certified language-learning
    programme and does not guarantee any Korean language proficiency
    outcomes.</p>

    <h3>Metro Station &amp; Map Integration</h3>
    <p>The integration of Seoul Metro station routes, maps, and nearby
    places of interest linked to vocabulary flashcards is provided for
    motivational purposes only. It is not based on scientific research as
    an effective method for enhancing Korean vocabulary learning. Use it
    for enjoyment, but seek professional instruction for serious language
    study.</p>

    <h3>Accuracy of Content</h3>
    <p>Sample vocabulary, sentences, and translations included in the app
    are provided for demonstration purposes only. We make no warranty as to
    their linguistic accuracy, completeness, or suitability for any
    particular purpose. Always verify important language content with a
    qualified source.</p>

    <h3>No Professional Advice</h3>
    <p>Nothing in this Service constitutes professional, educational,
    linguistic, or legal advice.</p>

    <h3>External Links</h3>
    <p>The Service may display links to third-party websites (e.g.
    place-of-interest URLs or sponsor links entered by users). We are not
    responsible for the content, accuracy, views, opinions expressed, or
    privacy practices of those external sites.</p>

    <h3>Availability</h3>
    <p>We do not guarantee that the Service will be available at all times.
    Scheduled or unscheduled downtime may occur. Local data remains
    accessible independently of server availability.</p>

    <h3>User-Generated Content and Peer-to-Peer File Sharing</h3>
    <p>The Service functions as a tool that enables users to create and curate
    their own vocabulary lists, routes, and associated content. The developer's
    role is analogous to that of a word-processor or spreadsheet application:
    it provides the means to create a file, but bears no responsibility for the
    content of that file or for what the user does with it thereafter.</p>
    <p>When a user exports a file and shares it with other users — whether
    privately or publicly — that transfer takes place entirely outside the
    Service, without the knowledge, involvement, or oversight of the developer.
    The developer accepts no responsibility for the accuracy, legality,
    completeness, or appropriateness of any User-Generated Content, nor for any
    consequences arising from the creation, export, or peer-to-peer distribution
    of such content. Users who share content do so entirely at their own
    discretion, risk, and liability.</p>

    <h3>Third-Party Branded Deployments and Self-Hosted Instances</h3>
    <p>The Flashcard Reader is open-source software that may be self-hosted,
    modified, or deployed by teachers, institutions, or other third parties under
    their own branding. The developer accepts no responsibility for the content,
    accuracy, conduct, privacy practices, bundled tile assets, or any outcomes
    arising from such deployments or from any modified version of the Flashcard
    Reader. This includes responsibility for any student or user data processed by
    those deployments. Each deployment is operated solely at the discretion and
    under the control of the respective third party. Users of any such deployment
    should direct any enquiries or complaints to the operator of that deployment.</p>

    <h3>Modified Versions</h3>
    <p>No warranty, support, or liability of any kind is provided by the developer
    for modified versions of the Flashcard Reader. The developer is not responsible
    for the behaviour, security, accuracy, or licensing compliance of any fork,
    modification, or derivative of the Flashcard Reader, regardless of whether it
    was modified by the deploying party or a third party.</p>

    <h3>Map Tile Assets</h3>
    <p>The developer makes no warranty as to the accuracy, completeness, currency,
    or licensing compliance of any map tile bundles generated or used in third-party
    deployments. Tile data is not developer IP. Compliance with any applicable
    upstream licence — including the OpenStreetMap Open Database License (ODbL) — is
    the sole responsibility of the party that generated or deployed those tiles.
    The developer does not host, serve, or control map tile data in any deployment.</p>

    <h3>Indemnification</h3>
    <p>You agree to indemnify and hold harmless
    <span data-brand="operator-name">Flashcard Fluency Routes</span> from any
    claim, damage, or expense arising from your use of the Service, your
    deployment of the Flashcard Reader, or violation of these Terms of Use.</p>

    <h3>Changes</h3>
    <p>This disclaimer may be updated at any time. Continued use of the
    Service constitutes acceptance of the current disclaimer.</p>
  `,

  // ── Open Source & Licensing ─────────────────────────────────────────────────
  opensource: `
    <p class="legal-effective">Last updated: May 2026</p>

    <h3>What is Open Source?</h3>
    <p>"Open source" means that the source code of the software is made publicly
    available. In practical terms:</p>
    <ul>
      <li>Anyone can read and inspect the code to understand exactly how it works.</li>
      <li>Anyone can copy, modify, and redistribute the software under the terms of
      its licence.</li>
      <li>Anyone can host their own independent instance of the software.</li>
    </ul>
    <p>Open source promotes transparency and trust. It does <strong>not</strong> mean
    freedom from responsibility — anyone who modifies or deploys the software takes on
    the obligations that come with that use.</p>

    <h3>The Flashcard Reader</h3>
    <p>The Flashcard Reader is open-source software available under the MIT License.
    This means:</p>
    <ul>
      <li>Its source code is publicly available for inspection.</li>
      <li>Teachers and educational institutions can host their own independent instances.</li>
      <li>Anyone can contribute to or fork the project.</li>
    </ul>
    <p><strong>Important:</strong> Open source applies to the software code only.
    Deployment assets — such as pre-generated map tile bundles — are distributed
    separately and carry their own licensing obligations. The MIT License does not
    extend to those assets.</p>

    <h3>MIT License — What It Means</h3>
    <p>The MIT License is one of the most permissive open-source licences available.
    In plain terms:</p>
    <ul>
      <li>You can use the software for any purpose, including commercial and educational use.</li>
      <li>You can modify the source code.</li>
      <li>You can redistribute the software or any modification of it.</li>
      <li>You <strong>must</strong> keep the copyright notice and the full MIT License
      text in all copies or significant portions of the software.</li>
      <li>The software is provided without warranty of any kind.</li>
      <li>The developer is not liable for any damages arising from use of the software.</li>
    </ul>

    <p>Full licence text:</p>
    <pre class="legal-license-block">MIT License

Copyright (c) 2026 <span data-brand="operator-name">Flashcard Fluency Routes</span>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</pre>

    <h3>Map Tiles &amp; OpenStreetMap</h3>
    <p>The Flashcard Reader uses pre-generated map tile bundles rather than fetching
    tiles from any external provider at runtime. This means:</p>
    <ul>
      <li>No runtime requests are made to OpenStreetMap or any tile API when the
      Flashcard Reader is running.</li>
      <li>Tile data is not stored in the source code repository.</li>
      <li>Each deployment must include a separately prepared tile bundle as part of its
      deployment package.</li>
    </ul>

    <h3>OpenStreetMap &amp; the Open Database License (ODbL)</h3>
    <p>If tile bundles are derived from OpenStreetMap data, they are subject to the
    <strong>Open Database License (ODbL)</strong>. Key obligations under the ODbL
    include:</p>
    <ul>
      <li><strong>Attribution</strong> — all public-facing deployments must display
      <strong>© OpenStreetMap contributors</strong>.</li>
      <li><strong>Share-alike</strong> — any produced works (including derivative tile
      sets) must be shared under the same or a compatible open licence.</li>
    </ul>
    <p>For full details, see
    <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">openstreetmap.org/copyright</a>
    and
    <a href="https://opendatacommons.org/licenses/odbl/" target="_blank" rel="noopener">opendatacommons.org/licenses/odbl</a>.</p>

    <h3>Responsibility for Map Tile Compliance</h3>
    <p>Self-hosters and deployment operators are <strong>solely responsible</strong>
    for:</p>
    <ul>
      <li>Including valid, correctly licensed tile bundles in their deployment.</li>
      <li>Ensuring full compliance with ODbL (or any other applicable licence) for the
      tile data they use.</li>
      <li>Displaying the required attribution notice
      (<strong>© OpenStreetMap contributors</strong>) in their deployed instance.</li>
      <li>Complying with the terms of any tile provider or build tool used to generate
      tile bundles.</li>
    </ul>
    <p>The developer does not host, serve, generate, or maintain tile data of any kind,
    and bears no responsibility for map tile licensing compliance in any third-party
    deployment.</p>
  `,

};
