export type Region =
  | "South Florida — Miami-Dade"
  | "South Florida — Broward"
  | "South Florida — Palm Beach"
  | "Gulf Coast"
  | "Central Florida"
  | "North Florida"
  | "Florida Keys";

export interface DamageType {
  label: string;
  slug: string; // matches /services/[slug]
}

export interface CityData {
  city: string;
  slug: string;
  county: string;
  region: Region;
  description: string[];
  commonDamageTypes: DamageType[];
  localFacts: {
    population?: string;
    commonPropertyTypes?: string;
    stormHistory?: string;
    floodZone?: string;
    uniqueRisks?: string;
  };
  nearbyAreas: { name: string; slug: string }[];
  featuredCaseType?: string; // matches caseResults[].type
}

export const cities: CityData[] = [
  // ─── South Florida — Miami-Dade ──────────────────────────────────────────
  {
    city: "Miami Lakes",
    slug: "miami-lakes",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Claim Remedy Adjusters is headquartered right here in Miami Lakes at 7900 Oak Ln Suite 400 — this is our home community, and representing Miami Lakes homeowners is personal to us. When your neighbor files a claim and the insurance company lowballs them, we take it seriously. We know these streets, these homes, and the insurance tactics used against this community.",
      "Miami Lakes was incorporated in 2000 and features a dense mix of single-family homes, townhomes, and lake-front communities, many built between the 1970s and 1990s. CBS (concrete block structure) construction with clay tile roofs is the norm. Those tile roofs, while durable, are particularly vulnerable to wind uplift during tropical storms — insurers frequently attribute damage to 'age' or 'wear' to reduce payouts on legitimate wind claims.",
      "Hurricane Andrew devastated nearby communities in 1992, and the rebuilding era left a patchwork of repair quality across the region. Hurricane Irma (2017) caused widespread wind and water intrusion damage in Miami Lakes, with many claims disputed or underpaid. Aging plumbing in pre-1990 homes — particularly cast iron pipes — is a leading cause of sudden water damage claims that insurers attempt to deny as 'maintenance issues.'",
      "Our proximity to your property means faster inspections, firsthand knowledge of local contractors and repair costs, and a team that has handled hundreds of Miami Lakes claims specifically. If you received a lowball offer or a denial on any property damage in Miami Lakes, call us — this is our backyard.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Mold Damage", slug: "water-damage" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
    ],
    localFacts: {
      population: "~34,000",
      commonPropertyTypes: "CBS construction, clay tile roofs, single-family and townhomes built 1970–2000",
      stormHistory: "Hurricane Andrew (1992) — nearby devastation; Hurricane Irma (2017) — widespread wind and water damage",
      floodZone: "Mixed FEMA zones; portions in AE (100-year floodplain) near lake areas",
      uniqueRisks: "Aging cast iron plumbing in pre-1990 homes, tile roof uplift during wind events, lake-proximity water intrusion",
    },
    nearbyAreas: [
      { name: "Hialeah", slug: "hialeah" },
      { name: "Miami Gardens", slug: "miami-gardens" },
      { name: "Doral", slug: "doral" },
      { name: "Miami", slug: "miami" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Hialeah",
    slug: "hialeah",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Hialeah is the second-largest city in Miami-Dade County and one of the most densely residential communities in South Florida. With a population that is over 95% Hispanic, Hialeah has a tight-knit homeowner community — and insurance companies know it. They count on language barriers, unfamiliarity with the claims process, and time pressure to push through underpaid or denied claims.",
      "The majority of Hialeah's residential stock was built between the 1950s and early 1970s, which means cast iron drain pipes, galvanized water supply lines, and original clay tile or flat roofs. Cast iron pipes corrode from the inside, eventually cracking and causing hidden water damage that appears suddenly — and insurers routinely classify this as a 'slow leak' to deny coverage, even when the failure is sudden and catastrophic.",
      "Hialeah's flat topography creates poor natural drainage. During heavy tropical rainfall — which South Florida receives regularly — streets and properties flood faster than drainage systems can handle. Many properties also sit in areas with high water tables, compounding moisture intrusion issues in slabs and walls. Mold growth following undetected leaks is extremely common and often develops before homeowners realize anything is wrong.",
      "Our team has handled dozens of Hialeah claims where insurance companies denied water damage as 'long-term deterioration.' We know how to document the difference between a maintenance issue and a covered loss, and we fight for every dollar you're owed.",
    ],
    commonDamageTypes: [
      { label: "Water Damage", slug: "water-damage" },
      { label: "Mold Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~230,000",
      commonPropertyTypes: "CBS homes built 1950–1975, cast iron plumbing, flat and low-slope roofs",
      stormHistory: "Hurricane Irma (2017) wind damage widespread; frequent tropical storm flooding",
      floodZone: "Portions in FEMA X and AE zones; high water table throughout",
      uniqueRisks: "Cast iron pipe failures, poor drainage causing recurring flood damage, aging roofs, hidden mold",
    },
    nearbyAreas: [
      { name: "Miami Lakes", slug: "miami-lakes" },
      { name: "Miami Gardens", slug: "miami-gardens" },
      { name: "Doral", slug: "doral" },
      { name: "Miami", slug: "miami" },
    ],
    featuredCaseType: "Water Claim",
  },
  {
    city: "Miami",
    slug: "miami",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Miami is the epicenter of South Florida's property insurance crisis. With some of the highest premiums in the nation and a claims environment where insurers routinely undervalue or deny legitimate losses, Miami homeowners and business owners need a licensed public adjuster in their corner from the moment damage occurs. Claim Remedy Adjusters represents property owners across all of Miami's diverse neighborhoods — from Brickell high-rises to Little Havana single-family homes.",
      "The property landscape in Miami spans everything from pre-war concrete structures in Coconut Grove to modern steel-and-glass condominiums downtown. Coastal properties face hurricane and storm surge exposure, while interior neighborhoods deal more frequently with plumbing failures and water intrusion. For condo owners, claims involve an additional layer of complexity — understanding what the HOA master policy covers versus your individual unit policy is critical, and insurers exploit that confusion.",
      "Miami has been in the direct path of or significantly impacted by nearly every major hurricane to hit Florida: Andrew (1992), Irma (2017), and multiple tropical storms. FEMA flood zones cover large swaths of the city, particularly near Biscayne Bay and the Miami River. Properties in AE and VE flood zones often carry mandatory flood insurance, but coordinating hurricane, homeowner, and flood claims simultaneously requires expertise most homeowners don't have.",
      "Commercial property owners in Miami face unique challenges — business interruption claims, commercial general liability overlaps, and multi-party buildings all complicate the claims process. Our team handles commercial losses across all property types and knows how to maximize recovery when your business has been disrupted by covered damage.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~450,000 city / ~2.7M metro",
      commonPropertyTypes: "Diverse: pre-war CBS, modern high-rises, waterfront condos, commercial properties",
      stormHistory: "Hurricane Andrew (1992), Irma (2017); frequent tropical storm and flood events",
      floodZone: "Extensive FEMA AE and VE zones along Biscayne Bay, Miami River, and coast",
      uniqueRisks: "Coastal surge, HOA/condo policy complexity, high-rise water damage, commercial BI claims",
    },
    nearbyAreas: [
      { name: "Miami Beach", slug: "miami-beach" },
      { name: "Coral Gables", slug: "coral-gables" },
      { name: "North Miami", slug: "north-miami" },
      { name: "Kendall", slug: "kendall" },
      { name: "Miami Lakes", slug: "miami-lakes" },
    ],
    featuredCaseType: "Denied Claim",
  },
  {
    city: "Doral",
    slug: "doral",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Doral is one of Miami-Dade's fastest-growing cities, incorporated in 2003 and developed primarily in the 2000s and 2010s. While newer construction is generally more hurricane-resistant than older South Florida stock, 'newer' doesn't mean immune — and insurance companies still find ways to dispute legitimate claims on modern properties.",
      "Doral is home to a significant commercial and industrial corridor, particularly along NW 87th Avenue and the Doral Park area. Warehouse fires, commercial water damage from roof failures or plumbing systems, and business interruption losses are common claim types our team handles regularly in this corridor. Commercial claims require a different approach than residential — documentation standards are higher and the financial stakes are larger.",
      "Residential Doral features many gated communities with townhomes, condos, and single-family homes. While newer construction uses modern impact windows and reinforced roofing systems, hail storms, severe tropical weather, and plumbing failures still generate claims. Flooding during heavy rain events is a concern in lower-lying western sections of the city where drainage infrastructure struggles to keep pace with development.",
      "Because Doral is relatively young as a city, many homeowners are first-time claimants with no experience navigating an insurance dispute. Insurance companies use that inexperience to their advantage. Claim Remedy Adjusters levels that playing field with expert documentation, independent damage estimates, and aggressive negotiation on your behalf.",
    ],
    commonDamageTypes: [
      { label: "Commercial Property", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~75,000",
      commonPropertyTypes: "Newer CBS construction (2000s–2010s), gated communities, significant commercial/industrial zone",
      stormHistory: "Hurricane Irma (2017) wind damage; heavy tropical rain flooding in western sections",
      floodZone: "Mixed FEMA zones; western areas have elevated flood risk",
      uniqueRisks: "Commercial property claims, flooding in newer developments, first-time claimant inexperience",
    },
    nearbyAreas: [
      { name: "Miami Lakes", slug: "miami-lakes" },
      { name: "Hialeah", slug: "hialeah" },
      { name: "Miami", slug: "miami" },
      { name: "Kendall", slug: "kendall" },
    ],
    featuredCaseType: "Commercial Loss",
  },
  {
    city: "Miami Gardens",
    slug: "miami-gardens",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Miami Gardens is the third-largest city in Miami-Dade County and one of the most predominantly residential cities in South Florida. Incorporated in 2003, it covers a large swath of northern Miami-Dade with neighborhoods that were developed primarily in the 1960s through 1980s — meaning a significant portion of the housing stock is now 40 to 60 years old.",
      "Aging roofs are the leading source of disputed claims in Miami Gardens. Many homes have roofs that are approaching or have exceeded their insured lifespan, and insurers use this to deny wind damage claims outright — arguing that the damage is due to 'wear and tear' rather than a covered storm event. A licensed public adjuster can document the difference between pre-existing deterioration and storm-caused damage, a distinction that directly impacts whether your claim is paid.",
      "Plumbing failures are the second major claim driver in Miami Gardens. Homes built in the 1960s and 1970s often have original galvanized steel or cast iron pipes that have corroded over decades. When these fail, water damage can be extensive — soaking drywall, flooring, and cabinetry before the leak is even detected. Insurers routinely deny these claims as 'gradual damage,' even when the actual failure is sudden.",
      "Miami Gardens also includes the Hard Rock Stadium area, generating commercial property claims from events and surrounding businesses. Whether your claim is residential or commercial, our team has the expertise to document, negotiate, and recover what you're owed.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~115,000",
      commonPropertyTypes: "CBS homes built 1960–1985, aging roofs, original plumbing systems",
      stormHistory: "Hurricane Irma (2017) widespread wind and roof damage; multiple tropical storm events",
      floodZone: "Portions in FEMA AE zones; flat terrain increases flood duration",
      uniqueRisks: "Aging roofs at end of lifespan, galvanized pipe failures, denied claims on older properties",
    },
    nearbyAreas: [
      { name: "Miami Lakes", slug: "miami-lakes" },
      { name: "Hialeah", slug: "hialeah" },
      { name: "North Miami Beach", slug: "north-miami" },
      { name: "Opa-locka", slug: "miami-gardens" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "Homestead",
    slug: "homestead",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Homestead holds a defining place in Florida insurance history — it was ground zero for Hurricane Andrew on August 24, 1992, the most destructive hurricane to hit the United States at the time. The destruction was so complete that entire neighborhoods were razed and rebuilt from scratch. That rebuilding era created a complicated insurance landscape: newer post-Andrew construction is generally stronger, but older rebuilt structures and the agricultural/rural properties on the edges of the city present unique challenges.",
      "Today, Homestead is experiencing rapid residential growth as development pushes southward from the Miami metro. New subdivisions sit alongside older communities and agricultural land, creating a diverse range of property types. Proximity to the Everglades creates a unique moisture environment — high humidity, ground-level moisture, and the potential for mold growth in properties that have experienced even minor water intrusion.",
      "Hurricane Irma (2017) made landfall in the Florida Keys but tracked directly over Homestead, causing significant roof damage, flooding, and fallen trees throughout the city. Many claims from Irma are still in dispute years later, as insurers have challenged damage assessments and used age-of-roof arguments to reduce or deny payouts. Our team has extensive experience with post-Irma claims in this region.",
      "The agricultural character of the area also generates unique commercial claims — greenhouse damage, storage facility losses, and business interruption for agricultural operations. Claim Remedy Adjusters handles both residential and commercial agricultural claims in and around Homestead.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~75,000",
      commonPropertyTypes: "Mix of post-Andrew rebuilt homes (1993+), newer subdivisions, agricultural properties",
      stormHistory: "Hurricane Andrew (1992) — direct hit, catastrophic; Hurricane Irma (2017) — direct track over city",
      floodZone: "Multiple FEMA flood zones including AE; Everglades proximity elevates moisture risk",
      uniqueRisks: "Everglades moisture environment, mold in humid conditions, agricultural property complexity",
    },
    nearbyAreas: [
      { name: "Kendall", slug: "kendall" },
      { name: "Miami", slug: "miami" },
      { name: "Key West", slug: "key-west" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Kendall",
    slug: "kendall",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Kendall is one of Miami-Dade's largest unincorporated communities, stretching across a wide swath of southwest Miami-Dade with a mix of single-family homes, townhome communities, condos, and shopping centers. The area was heavily developed in the 1970s and 1980s, meaning a large portion of its housing stock is now 35 to 50 years old — prime territory for insurance disputes over roof age and deferred maintenance.",
      "Hurricane Andrew (1992) caused massive structural damage throughout Kendall, and the post-storm reconstruction produced a wide range of repair quality. Some properties were professionally rebuilt; others received quick patch repairs that have since deteriorated. When a new storm damages one of these partially rebuilt properties, sorting out what is covered versus what is pre-existing becomes complex — which is exactly the kind of situation where having a public adjuster pays off.",
      "Kendall's suburban layout includes many homes with older flat roofs and CBS construction. Flat roofs require careful maintenance and are highly susceptible to water intrusion when their membranes age. Insurers frequently deny flat roof water damage claims as 'maintenance failures,' even when a storm event was the direct cause of the leak.",
      "With hundreds of thousands of residents and a dense commercial strip along Kendall Drive, this community generates a significant volume of insurance claims annually. Our team handles both residential and commercial claims throughout the Kendall area with the same attention to detail that has produced millions in recoveries for South Florida policyholders.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~80,000 (unincorporated)",
      commonPropertyTypes: "CBS construction (1970s–1990s), flat roofs, single-family and townhomes",
      stormHistory: "Hurricane Andrew (1992) — major structural damage; Hurricane Irma (2017) — widespread wind",
      floodZone: "Mixed FEMA zones; portions in AE flood zone",
      uniqueRisks: "Aging flat roofs, post-Andrew patch repairs, high volume of insurance disputes",
    },
    nearbyAreas: [
      { name: "Miami", slug: "miami" },
      { name: "Homestead", slug: "homestead" },
      { name: "Coral Gables", slug: "coral-gables" },
      { name: "Doral", slug: "doral" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "Coral Gables",
    slug: "coral-gables",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Coral Gables is one of Miami's most historic cities, planned in the 1920s by George Merrick and known for its Mediterranean Revival architecture, canopied streets, and strict zoning codes. Many homes here are 60 to 100 years old, featuring original clay tile roofs, coral rock construction, and mature canopy trees — all of which create a unique insurance claims environment that most public adjusters don't fully understand.",
      "Historic properties in Coral Gables often require specialized contractors for repairs, and insurance companies frequently attempt to pay claims based on standard replacement costs rather than the premium materials and craftsmanship required for code-compliant restoration. When a storm damages an original 1940s barrel tile roof, the cost to properly replace it with period-appropriate materials is far higher than a standard asphalt shingle replacement — and your insurer needs to pay the real number.",
      "The mature tree canopy that makes Coral Gables beautiful becomes a liability during tropical storms. Falling trees and branches cause roof penetrations, structural damage, and secondary water intrusion. These claims are often complex — involving multiple damage events, questions about negligence, and disputes over what was storm-caused versus pre-existing tree stress.",
      "Higher property values in Coral Gables mean the financial stakes on every claim are higher. Insurance companies assign experienced adjusters to high-value claims specifically to minimize payouts. We counter that with our own experienced team, independent contractor estimates, and the negotiation leverage that comes from knowing the local market inside and out.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
    ],
    localFacts: {
      population: "~52,000",
      commonPropertyTypes: "Historic Mediterranean Revival (1920s–1950s), coral rock and CBS construction, original tile roofs",
      stormHistory: "Hurricane Andrew (1992) tree and roof damage; Hurricane Irma (2017) widespread fallen trees",
      floodZone: "Portions near canals and Biscayne Bay in FEMA AE zones",
      uniqueRisks: "Historic material replacement costs, falling tree damage, high-value claims with experienced insurer adjusters",
    },
    nearbyAreas: [
      { name: "Miami", slug: "miami" },
      { name: "Kendall", slug: "kendall" },
      { name: "Miami Beach", slug: "miami-beach" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "North Miami",
    slug: "north-miami",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "North Miami is one of Miami-Dade's older residential communities, with a housing stock that dates primarily to the 1950s and 1960s. The city sits between Miami and North Miami Beach, just inland from Biscayne Bay, giving many properties a coastal adjacency that increases storm exposure while also creating unique salt-air corrosion issues on roofing systems, HVAC equipment, and exterior building materials.",
      "Cast iron plumbing is widespread in North Miami's older homes, and the failure of these systems is the leading source of water damage claims in the area. A cast iron pipe failure can release hundreds of gallons of water inside a wall or under a slab before it's detected, causing damage to flooring, drywall, cabinetry, and creating conditions that lead to mold growth within 24 to 48 hours. Insurers often attempt to deny these claims as 'slow leaks' even when the pipe has experienced a sudden, complete failure.",
      "The proximity to Biscayne Bay means that North Miami properties face storm surge risk during hurricane events. Many properties are in FEMA flood zones that require flood insurance in addition to standard homeowner coverage. Coordinating a claim across both policies requires expertise to ensure all covered losses are captured and properly submitted.",
      "Our team is familiar with the specific neighborhoods of North Miami — from Ives Estates to Ojus to Little River — and the unique challenges each area presents. If your claim has been denied or undervalued, we provide free claim reviews with no obligation.",
    ],
    commonDamageTypes: [
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~63,000",
      commonPropertyTypes: "CBS homes built 1950–1970, cast iron and galvanized plumbing, older flat and tile roofs",
      stormHistory: "Hurricane Irma (2017) wind and surge damage; frequent tropical storm events",
      floodZone: "Multiple FEMA zones near Biscayne Bay; portions in AE flood zone",
      uniqueRisks: "Cast iron pipe failures, Biscayne Bay storm surge, salt-air corrosion on exterior materials",
    },
    nearbyAreas: [
      { name: "Miami", slug: "miami" },
      { name: "Miami Beach", slug: "miami-beach" },
      { name: "Miami Gardens", slug: "miami-gardens" },
    ],
    featuredCaseType: "Water Claim",
  },
  {
    city: "Miami Beach",
    slug: "miami-beach",
    county: "Miami-Dade County",
    region: "South Florida — Miami-Dade",
    description: [
      "Miami Beach sits on a barrier island between Biscayne Bay and the Atlantic Ocean — it is one of the most flood-vulnerable cities in the United States. Virtually every property in Miami Beach faces real flood risk, and the combination of hurricane winds, storm surge, and rising sea levels makes property insurance here among the most complex and contentious in Florida.",
      "The property mix in Miami Beach runs from Art Deco historic buildings in South Beach to modern luxury condominiums on mid-beach to older residential neighborhoods in North Miami Beach. High-rise condo claims are particularly complex: they involve multiple insurance policies (the association's master policy and individual unit policies), questions about what the association is responsible for repairing versus what falls to the unit owner, and often contentious disputes between the HOA board and individual owners.",
      "Salt air is a constant presence in Miami Beach, and it accelerates the corrosion of roofing fasteners, HVAC systems, balcony railings, and window frames. When a storm event triggers insurance claims, insurers frequently argue that the damage is due to long-term salt corrosion rather than the storm itself — blurring the line between a covered claim and an excluded maintenance issue. We document these claims precisely to ensure storm-caused damage is properly separated from corrosion.",
      "Miami Beach has experienced severe flooding during multiple hurricane and king tide events, with several neighborhoods seeing street-level flooding that enters ground-floor units. Flood claims, hurricane claims, and wind claims often overlap, and having all three managed by a single experienced public adjuster ensures nothing falls through the cracks.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~82,000",
      commonPropertyTypes: "Art Deco historic buildings, luxury condos, residential mid-rise, barrier island construction",
      stormHistory: "Multiple hurricane impacts; Hurricane Irma (2017) significant flood and wind damage",
      floodZone: "Extensive FEMA AE and VE zones — most of the island is in a flood zone",
      uniqueRisks: "Storm surge, salt air corrosion, HOA/condo policy complexity, rising sea level flooding",
    },
    nearbyAreas: [
      { name: "Miami", slug: "miami" },
      { name: "North Miami", slug: "north-miami" },
      { name: "Coral Gables", slug: "coral-gables" },
    ],
    featuredCaseType: "Denied Claim",
  },

  // ─── South Florida — Broward ─────────────────────────────────────────────
  {
    city: "Fort Lauderdale",
    slug: "fort-lauderdale",
    county: "Broward County",
    region: "South Florida — Broward",
    description: [
      "Fort Lauderdale is Broward County's largest city and a major hub for both residential and commercial property damage claims. Known as the 'Venice of America' for its 165 miles of inland waterways, Fort Lauderdale presents a unique set of challenges for property owners — canal-front homes face flood and water intrusion risks that interior properties don't, and the dense urban core generates high-value commercial claims.",
      "Hurricane Wilma (2005) caused widespread damage across Fort Lauderdale — one of the most expensive storms in Broward County history. Many roofs that appeared to survive Wilma developed chronic leak issues in subsequent years as storm-weakened materials finally failed. This created a wave of 'delayed discovery' claims that insurers fought aggressively. Our team has seen these patterns and knows how to document them.",
      "Fort Lauderdale's waterfront properties — along Las Olas Isles, Rio Vista, and Victoria Park — face compound risks: storm surge from hurricanes, regular tidal flooding along the canal system, and wind exposure on properties with no barrier protection. Canal-front homes with sea walls and docks also generate claims for sea wall damage and dock destruction that require specialized valuation.",
      "The downtown and Flagler Village commercial corridors generate significant business property and business interruption claims. For commercial property owners, documenting income loss during repair periods and fighting for full replacement cost coverage requires the kind of expertise Claim Remedy Adjusters brings to every engagement.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~185,000",
      commonPropertyTypes: "Waterfront homes, CBS residential, commercial downtown, high-rises along the coast",
      stormHistory: "Hurricane Wilma (2005) — major damage; Hurricane Irma (2017) — widespread wind and flooding",
      floodZone: "Extensive FEMA AE and VE zones throughout canal system and coastal areas",
      uniqueRisks: "Canal flooding, storm surge, sea wall and dock damage, waterfront property complexity",
    },
    nearbyAreas: [
      { name: "Hollywood", slug: "hollywood" },
      { name: "Pompano Beach", slug: "pompano-beach" },
      { name: "Oakland Park", slug: "coral-springs" },
      { name: "Miramar", slug: "miramar" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Hollywood",
    slug: "hollywood",
    county: "Broward County",
    region: "South Florida — Broward",
    description: [
      "Hollywood sits between Fort Lauderdale and Miami, stretching from the Atlantic coast to the western edge of Broward County. The city has a diverse mix of housing types — older 1950s and 1960s homes along Hollywood Beach, mid-century residential neighborhoods inland, and newer developments to the west. That age diversity means claim complexity varies significantly by neighborhood.",
      "Beachfront properties in Hollywood face the full force of Atlantic hurricane winds and storm surge. Properties in Hollywood Beach and the surrounding coastal zone regularly experience salt air exposure, wave action during storms, and flooding from both oceanic surge and inland drainage backup. When multiple causes of loss intersect, documenting each separately is critical to maximizing recovery under both hurricane and flood policies.",
      "Hollywood's inland residential areas — particularly the older neighborhoods around Hollywood Lakes and Young Circle — have aging infrastructure that generates water damage claims. Older galvanized and cast iron plumbing, flat roofs with weathered membranes, and trees that haven't been managed for storm resistance create a predictable set of claim types that insurance companies are well prepared to dispute.",
      "The I-95 and I-595 corridors through Hollywood also include a significant commercial strip with retail, warehouse, and light industrial properties. Commercial property owners facing storm damage, fire, or plumbing failures benefit from professional public adjusting to document the full scope of their loss — including both physical damage and business income impact.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~155,000",
      commonPropertyTypes: "CBS homes (1950s–1970s), beachfront condos and hotels, newer western developments",
      stormHistory: "Hurricane Wilma (2005) and Irma (2017) both caused widespread damage",
      floodZone: "Coastal VE and AE zones; portions in FEMA X with elevated flood history",
      uniqueRisks: "Coastal surge, salt air corrosion, older plumbing in inland homes, flat roof failures",
    },
    nearbyAreas: [
      { name: "Fort Lauderdale", slug: "fort-lauderdale" },
      { name: "Pembroke Pines", slug: "pembroke-pines" },
      { name: "Miramar", slug: "miramar" },
    ],
    featuredCaseType: "Water Claim",
  },
  {
    city: "Pembroke Pines",
    slug: "pembroke-pines",
    county: "Broward County",
    region: "South Florida — Broward",
    description: [
      "Pembroke Pines is one of Broward County's largest cities by population, built primarily in the 1990s and 2000s as South Florida's suburban expansion pushed westward. The city is dominated by planned residential communities — gated neighborhoods with HOAs, townhome complexes, and large apartment communities — presenting a specific set of challenges when damage occurs.",
      "Because much of Pembroke Pines was built in a single 20-year development window, a large portion of the housing stock has roofs that are now approaching end-of-life simultaneously. Insurance companies in Florida have become aggressive about non-renewing policies with roofs over 15 years old, and homeowners who need to file a storm damage claim on an aging roof face heightened scrutiny. Our public adjusters know how to document legitimate storm damage regardless of roof age.",
      "Western Pembroke Pines borders the Everglades and agricultural land, creating drainage challenges during heavy rainfall. The flat terrain means water has nowhere to go, and flooding during tropical storm events has impacted dozens of communities in the western sections of the city. When water enters a home through flood rather than storm wind, understanding which policy covers which damage is essential.",
      "Pembroke Pines also has a substantial commercial strip along Pines Boulevard, and major commercial centers generate business property claims. Our team handles residential and commercial claims throughout Pembroke Pines with the same disciplined approach to documentation and negotiation.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~175,000",
      commonPropertyTypes: "Planned communities, CBS homes and townhomes (1990s–2000s), gated neighborhoods",
      stormHistory: "Hurricane Irma (2017) wind damage throughout; tropical flooding in western areas",
      floodZone: "Mixed FEMA zones; western areas with Everglades proximity have elevated risk",
      uniqueRisks: "Aging 1990s–2000s roofs approaching end-of-life, flooding in western sections, HOA-complication claims",
    },
    nearbyAreas: [
      { name: "Miramar", slug: "miramar" },
      { name: "Hollywood", slug: "hollywood" },
      { name: "Coral Springs", slug: "coral-springs" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "Miramar",
    slug: "miramar",
    county: "Broward County",
    region: "South Florida — Broward",
    description: [
      "Miramar is a growing Broward County city whose western boundary approaches the Everglades, making it one of South Florida's westernmost developed communities. The city experienced rapid residential and commercial development in the 2000s and 2010s, creating a mix of newer planned communities alongside the older neighborhoods that predate the city's expansion era.",
      "The western location means Miramar receives some of the highest rainfall totals in Broward County during tropical events. Water management infrastructure struggles to keep pace with development, and flooding during heavy rain or hurricane events has impacted western residential communities significantly. The distinction between flood damage (covered under separate flood insurance) and wind-driven rain (covered under homeowner policies) is frequently disputed by insurers.",
      "Miramar's commercial and industrial sector along I-75 and Miramar Parkway is one of the most active in Broward County. Warehouse and distribution facilities, corporate campuses, and retail centers generate property claims that require professional handling. Commercial claims involve complex loss calculations — replacement cost, business interruption, extra expense — that require expertise to document and negotiate.",
      "Residential communities in Miramar typically feature CBS construction with tile roofs. While these are hurricane-resistant when new, as they age and particularly after exposure to storm events, tiles can be displaced, underlayment can fail, and water intrusion follows. We document these patterns carefully to ensure they are recognized as storm damage rather than maintenance issues.",
    ],
    commonDamageTypes: [
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~140,000",
      commonPropertyTypes: "Planned residential communities (2000s), commercial/industrial corridor along I-75",
      stormHistory: "Hurricane Irma (2017); frequent tropical flooding in western sections",
      floodZone: "Western areas in elevated FEMA flood zones due to Everglades proximity",
      uniqueRisks: "Flood vs. wind-driven rain disputes, commercial property complexity, Everglades drainage challenges",
    },
    nearbyAreas: [
      { name: "Pembroke Pines", slug: "pembroke-pines" },
      { name: "Hollywood", slug: "hollywood" },
      { name: "Miami Gardens", slug: "miami-gardens" },
    ],
    featuredCaseType: "Water Claim",
  },
  {
    city: "Coral Springs",
    slug: "coral-springs",
    county: "Broward County",
    region: "South Florida — Broward",
    description: [
      "Coral Springs was one of Florida's first planned cities, incorporated in 1963 and developed with intention — wide boulevards, neighborhood parks, and well-maintained residential communities. That deliberate planning has produced a city with a strong residential character and a housing stock that, while generally well-maintained, is now 40 to 60 years old in many neighborhoods.",
      "The age of Coral Springs' housing stock means many properties are reaching critical infrastructure milestones — roofs that need replacement, plumbing systems that are approaching end-of-life, and electrical systems that predate modern code requirements. When these systems fail or are damaged by storm events, insurance companies frequently argue that age or deferred maintenance is the cause rather than a covered event. Our adjusters know how to counter these arguments.",
      "Coral Springs' interior location provides some buffer from direct coastal hurricane impacts, but the city is far from immune. Tropical storms and the outer bands of major hurricanes generate significant wind damage, particularly affecting roofs and trees. The mature landscaping that makes Coral Springs attractive becomes a source of roof damage claims during every storm season.",
      "The Wiles Road and University Drive commercial corridors generate retail and office property claims. Water damage from roof leaks following storms — a particularly common claim type in commercial properties with flat or low-slope roofing — requires thorough documentation of both direct damage and resulting business interruption.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~135,000",
      commonPropertyTypes: "Planned residential communities (1970s–1990s), well-maintained CBS homes, mature landscaping",
      stormHistory: "Hurricane Wilma (2005) and Irma (2017) caused wind and tree damage throughout",
      floodZone: "Mostly FEMA X zone with moderate flood risk; some AE areas near canals",
      uniqueRisks: "Aging roofs and plumbing, falling tree damage, flat commercial roofs, age-of-system disputes",
    },
    nearbyAreas: [
      { name: "Pompano Beach", slug: "pompano-beach" },
      { name: "Boca Raton", slug: "boca-raton" },
      { name: "Pembroke Pines", slug: "pembroke-pines" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "Pompano Beach",
    slug: "pompano-beach",
    county: "Broward County",
    region: "South Florida — Broward",
    description: [
      "Pompano Beach occupies a prime stretch of Broward County's Atlantic coastline and extends inland through diverse residential neighborhoods and an active industrial corridor. The city's ocean frontage makes it one of Broward's most storm-exposed communities, while its industrial waterfront along the Intracoastal generates significant commercial property claims.",
      "Beachfront properties in Pompano face the same challenges as all Atlantic-coast South Florida properties — direct hurricane wind exposure, storm surge from major systems, and the constant degrading effect of salt air on building materials. The barrier island sections of Pompano Beach have some of the highest flood risk in Broward County, with FEMA VE zones covering oceanfront properties.",
      "Pompano's inland neighborhoods include a mix of 1950s to 1970s CBS homes, retirement communities, and more recent developments. The older housing stock has the predictable challenges of aging roofs, cast iron plumbing, and original windows that no longer meet modern hurricane standards. When these older homes take a direct hit from a tropical storm, the damage is often more extensive than on newer construction, and the claims are larger — and more fiercely disputed.",
      "The commercial fishing industry and marine services sector along Pompano Beach's waterfront generate specialized marine and commercial property claims. Our team handles the full range of property claim types, including the unique challenges of marine and waterfront commercial properties.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~115,000",
      commonPropertyTypes: "Beachfront condos, CBS residential (1950s–1970s), marine/industrial waterfront commercial",
      stormHistory: "Hurricane Wilma (2005) — direct impact; Hurricane Irma (2017) — coastal damage",
      floodZone: "Oceanfront VE zones; extensive AE zones along Intracoastal and barrier islands",
      uniqueRisks: "Storm surge, salt air corrosion, marine property complexity, aging inland residential stock",
    },
    nearbyAreas: [
      { name: "Fort Lauderdale", slug: "fort-lauderdale" },
      { name: "Coral Springs", slug: "coral-springs" },
      { name: "Boca Raton", slug: "boca-raton" },
    ],
    featuredCaseType: "Hurricane Claim",
  },

  // ─── South Florida — Palm Beach ──────────────────────────────────────────
  {
    city: "Boca Raton",
    slug: "boca-raton",
    county: "Palm Beach County",
    region: "South Florida — Palm Beach",
    description: [
      "Boca Raton is one of South Florida's most affluent communities, known for its luxury homes, high-end commercial properties, and strict architectural standards. Higher property values mean larger claims — and insurance companies respond to large claims by assigning their most experienced and aggressive adjusters. A licensed public adjuster who understands high-value property claims is essential in Boca Raton.",
      "The Boca Raton coastline is directly exposed to Atlantic hurricane winds, and barrier island communities like Boca Teeca and the Highlands face storm surge and flood risk in addition to wind damage. Luxury beachfront homes often have custom finishes, imported materials, and designer landscaping — all of which require specialized replacement cost documentation that a standard insurance adjuster rarely provides.",
      "Inland Boca Raton features upscale residential communities, executive office parks, and retail centers. Commercial property damage claims here are substantial, as the replacement cost for high-end commercial finishes and specialized business equipment is significantly higher than standard. Business interruption claims at Boca Raton's premium retail and professional service establishments can be particularly valuable to document properly.",
      "Palm Beach County's insurance market has been under pressure following multiple storm seasons, and Boca Raton homeowners have seen non-renewals and coverage reductions from major insurers. When you file a claim in this environment, having professional representation ensures your insurer can't take advantage of the disruption in the market to underpay your legitimate loss.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~100,000",
      commonPropertyTypes: "Luxury single-family, high-end condos, executive commercial, custom construction",
      stormHistory: "Hurricane Wilma (2005) — significant damage; multiple Atlantic hurricane impacts",
      floodZone: "Coastal VE and AE zones; flood risk along Intracoastal and tidal areas",
      uniqueRisks: "High-value custom finishes requiring specialized replacement cost, luxury commercial BI claims",
    },
    nearbyAreas: [
      { name: "Delray Beach", slug: "delray-beach" },
      { name: "Pompano Beach", slug: "pompano-beach" },
      { name: "Boynton Beach", slug: "boynton-beach" },
    ],
    featuredCaseType: "Commercial Loss",
  },
  {
    city: "West Palm Beach",
    slug: "west-palm-beach",
    county: "Palm Beach County",
    region: "South Florida — Palm Beach",
    description: [
      "West Palm Beach is the county seat of Palm Beach County and the most significant urban center on Florida's Treasure Coast. The city encompasses everything from the historic Northwood neighborhood to the modern CityPlace entertainment district, and its property base ranges from modest residential homes to major commercial high-rises — generating a wide range of insurance claim types.",
      "Properties along the Intracoastal Waterway and Lake Worth Lagoon face compound flood and storm surge risks. The Intracoastal is a primary pathway for surge during hurricane events, inundating waterfront properties that may have missed direct wind damage. Flood claims along the Intracoastal frequently require separate flood policy documentation in addition to standard homeowner claims.",
      "West Palm Beach has a significant stock of older residential properties — the Northwood, Flamingo Park, and Grandview Heights neighborhoods contain historic homes from the 1920s through 1950s that have unique claims challenges. Period materials, custom moldings, historic windows, and original tile work all require careful valuation documentation when damaged.",
      "The downtown West Palm Beach commercial district, the medical center complex near I-95, and the industrial areas north of the city generate substantial commercial property claims. Business interruption in West Palm Beach's growing hospitality and professional services sector is a significant component of commercial storm claims that requires experienced quantification.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~120,000",
      commonPropertyTypes: "Historic homes (1920s–1950s), mid-century residential, commercial downtown, Intracoastal waterfront",
      stormHistory: "Hurricane Frances and Jeanne (2004) — back-to-back impacts; Hurricane Irma (2017)",
      floodZone: "Intracoastal and Lake Worth AE zones; coastal VE zones near the barrier island",
      uniqueRisks: "Historic material replacement costs, Intracoastal surge, downtown commercial BI claims",
    },
    nearbyAreas: [
      { name: "Boca Raton", slug: "boca-raton" },
      { name: "Boynton Beach", slug: "boynton-beach" },
      { name: "Jupiter", slug: "jupiter" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Boynton Beach",
    slug: "boynton-beach",
    county: "Palm Beach County",
    region: "South Florida — Palm Beach",
    description: [
      "Boynton Beach is a mid-sized Palm Beach County city with a diverse residential base that spans from oceanfront condominiums on the barrier island to affordable inland communities west of I-95. The city's demographic diversity is reflected in its housing stock — older 1960s and 1970s homes in central Boynton sit alongside newer gated communities in the western sections.",
      "Ocean Ridge and the barrier island portions of Boynton Beach face the direct force of Atlantic storms. Properties here have experienced storm surge damage from multiple hurricane events, and the barrier island's narrow profile means there is little natural protection from either ocean or Intracoastal flooding. Flood insurance is mandatory for most barrier island properties, but coordinating flood and wind claims is complex.",
      "Inland Boynton Beach has a significant retirement community population, which has implications for claims handling. Retired homeowners on fixed incomes are particularly vulnerable to insurer pressure tactics, and insurance companies know it. Having a professional advocate ensures that age, inexperience with the claims process, or physical limitations don't result in an unfair settlement.",
      "Boynton Beach's retail and light commercial sector along Boynton Beach Boulevard generates commercial property claims following storm events. Water intrusion into retail spaces, damaged signage and storefronts, and HVAC systems damaged by debris or flooding are common claim types our team handles efficiently.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~80,000",
      commonPropertyTypes: "Barrier island condos, CBS homes (1960s–1980s), newer western gated communities",
      stormHistory: "Hurricane Frances and Jeanne (2004); Hurricane Irma (2017) — widespread damage",
      floodZone: "Barrier island VE and AE zones; inland portions mostly FEMA X",
      uniqueRisks: "Barrier island surge, retirement community vulnerability to insurer pressure, aging inland housing stock",
    },
    nearbyAreas: [
      { name: "Delray Beach", slug: "delray-beach" },
      { name: "West Palm Beach", slug: "west-palm-beach" },
      { name: "Boca Raton", slug: "boca-raton" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "Delray Beach",
    slug: "delray-beach",
    county: "Palm Beach County",
    region: "South Florida — Palm Beach",
    description: [
      "Delray Beach is one of South Florida's most desirable communities, known for its vibrant Atlantic Avenue downtown, beautiful beachfront, and a residential mix that ranges from historic bungalows to modern luxury townhomes. The city has undergone significant revitalization over the past two decades, meaning many properties feature recent renovations alongside aging structural elements — a combination that creates unique documentation challenges during insurance claims.",
      "Beachfront and near-beach properties in Delray face direct Atlantic hurricane exposure. The barrier island communities here — Delray Shores, High Point, and the beachfront condo corridors — are in FEMA coastal flood zones and have experienced storm surge and wind damage during multiple hurricane seasons. Documenting damage to renovated historic properties requires expertise in both period materials and modern replacement standards.",
      "The older residential neighborhoods west of the barrier island, including areas like Lake Ida and the original Delray neighborhoods, have a housing stock from the 1950s and 1960s with original infrastructure. Cast iron plumbing, original galvanized steel windows, and flat or low-slope roofs with aging membranes create a predictable pattern of water damage claims that insurance companies routinely attempt to attribute to maintenance rather than sudden loss.",
      "The Atlantic Avenue entertainment district generates commercial claims from fire, water, and storm damage at restaurants, retailers, and hospitality businesses. Business interruption documentation in Delray Beach's high-revenue commercial sector requires experienced quantification to ensure full income loss recovery.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
    ],
    localFacts: {
      population: "~70,000",
      commonPropertyTypes: "Historic bungalows, barrier island condos, newer luxury townhomes, vibrant commercial district",
      stormHistory: "Hurricane Frances and Jeanne (2004); Hurricane Irma (2017) — coastal and wind damage",
      floodZone: "Coastal VE and AE zones on barrier island; Intracoastal AE zone",
      uniqueRisks: "Historic property replacement cost, surf-zone surge exposure, aging plumbing in older neighborhoods",
    },
    nearbyAreas: [
      { name: "Boca Raton", slug: "boca-raton" },
      { name: "Boynton Beach", slug: "boynton-beach" },
      { name: "West Palm Beach", slug: "west-palm-beach" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Jupiter",
    slug: "jupiter",
    county: "Palm Beach County",
    region: "South Florida — Palm Beach",
    description: [
      "Jupiter is one of northern Palm Beach County's most desirable communities, known for its natural beauty, the Loxahatchee River, and a mix of waterfront estates, residential communities, and a strong commercial core. The city's northern Palm Beach County location gives it a slightly different storm track exposure than southern communities, with some systems that miss Miami having a more direct path toward Jupiter.",
      "Waterfront properties along the Intracoastal Waterway, Jupiter Inlet, and the Loxahatchee River are exposed to both storm surge and river flooding during major rain events. These dual risks — coastal surge from hurricanes and inland flooding from storm precipitation — can result in damages that fall across both homeowner and flood insurance policies, requiring careful coordination to ensure complete coverage.",
      "The residential communities of Abacoa, Jupiter Farms, and the various gated developments throughout the city feature newer construction (2000s–2010s) that has benefited from post-Andrew building codes. However, 'built to code' doesn't mean undamageable — even modern construction sustains losses from major hurricanes, and insurers can't use age as an excuse to deny coverage on these properties.",
      "Jupiter's growing commercial corridor along Indiantown Road and US-1 includes retail, medical, and professional service establishments. Property damage at these businesses — from storm, water, or fire — requires professional documentation of both physical damage and the often-substantial business income interruption that results.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
    ],
    localFacts: {
      population: "~63,000",
      commonPropertyTypes: "Waterfront estates, newer planned communities (2000s+), mixed residential and commercial",
      stormHistory: "Multiple Atlantic hurricane impacts; riverine flooding from Loxahatchee during heavy rain events",
      floodZone: "Intracoastal and Loxahatchee River AE zones; coastal flood risk near Jupiter Inlet",
      uniqueRisks: "Dual flood/surge exposure, river flooding in addition to coastal risk, high-value waterfront properties",
    },
    nearbyAreas: [
      { name: "West Palm Beach", slug: "west-palm-beach" },
      { name: "Boynton Beach", slug: "boynton-beach" },
      { name: "Delray Beach", slug: "delray-beach" },
    ],
    featuredCaseType: "Hurricane Claim",
  },

  // ─── Gulf Coast ──────────────────────────────────────────────────────────
  {
    city: "Tampa",
    slug: "tampa",
    county: "Hillsborough County",
    region: "Gulf Coast",
    description: [
      "Tampa is Florida's third-largest city and the economic center of the Tampa Bay metro — a region that, despite its size and prominence, had not taken a direct major hurricane hit in over a century until recent storms changed the trajectory. Hurricane Ian (2022), while making landfall south of Tampa near Fort Myers, generated storm surge and wind damage throughout the Tampa Bay area. Idalia (2023) brought additional surge to parts of the bay. The region's long period without a direct hit had created a false sense of security that has now been shattered.",
      "Tampa's diverse urban landscape — from the historic bungalows of Hyde Park and Seminole Heights to the modern high-rises of downtown and the suburban communities of New Tampa — generates an equally diverse range of insurance claim types. Historic properties require careful replacement cost documentation; high-rises face complex HOA and association policy claims; suburban communities deal with the standard post-storm pattern of roof damage and water intrusion.",
      "Tampa Bay's geography amplifies storm surge risk significantly. The bay acts as a funnel, concentrating surge water as storms approach from the Gulf. FEMA flood zones cover extensive portions of Tampa, including South Tampa, Ballast Point, and waterfront neighborhoods that could experience 10 to 20 feet of surge in a direct major hurricane hit. Flood claims on these properties require dedicated management separate from homeowner wind claims.",
      "The commercial property base in Tampa — including the Westshore business district, Ybor City entertainment district, and Port Tampa Bay — generates substantial commercial claims. Business interruption in a major commercial hub like Tampa can represent millions in lost income that requires professional documentation to recover.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~400,000",
      commonPropertyTypes: "Historic bungalows (1920s–1940s), suburban CBS, downtown high-rises, commercial metro",
      stormHistory: "Hurricane Ian (2022) surge and wind; Hurricane Idalia (2023) surge; no direct major hit 1921–2024",
      floodZone: "Extensive FEMA AE and VE zones throughout; South Tampa and waterfront areas highest risk",
      uniqueRisks: "Tampa Bay surge funnel amplification, historic property replacement costs, commercial BI complexity",
    },
    nearbyAreas: [
      { name: "St. Petersburg", slug: "st-petersburg" },
      { name: "Clearwater", slug: "clearwater" },
      { name: "Sarasota", slug: "sarasota" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "St. Petersburg",
    slug: "st-petersburg",
    county: "Pinellas County",
    region: "Gulf Coast",
    description: [
      "St. Petersburg occupies the Pinellas Peninsula, surrounded by Tampa Bay to the east, the Gulf of Mexico to the west, and Tampa Bay tributaries to the north — making it one of Florida's most water-encircled cities and one of its most storm surge vulnerable. The Pinellas Peninsula has limited evacuation routes, a reality that defines the city's emergency planning and its property insurance landscape.",
      "St. Pete's housing stock spans from the charming historic neighborhoods of Old Northeast and Kenwood, with their 1920s bungalows and craftsman homes, to modern waterfront condominiums along Beach Drive and the downtown waterfront. Historic properties here face the same replacement cost challenges as any Florida historic district — original materials, custom woodwork, and period finishes require specialized documentation when damaged.",
      "The barrier islands off St. Petersburg — including St. Pete Beach, Treasure Island, Madeira Beach, and Pass-a-Grille — represent some of Florida's highest storm surge exposure. These narrow barrier islands can be completely inundated during a major Gulf hurricane, and the combination of surge, wave action, and wind creates total loss scenarios for properties that are not elevated to current FEMA standards.",
      "Hurricane Helene (2024) demonstrated exactly this risk, generating historic storm surge that flooded thousands of St. Petersburg properties. Many of these homeowners are navigating the insurance claim process for the first time — and doing so while also dealing with the trauma of losing their homes. Claim Remedy Adjusters can manage the entire claims process so you can focus on recovery.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~260,000",
      commonPropertyTypes: "Historic bungalows (1920s–1940s), barrier island condos, downtown waterfront high-rises",
      stormHistory: "Hurricane Helene (2024) — historic surge; Hurricane Ian (2022) regional impact; no direct major hit in decades",
      floodZone: "Extensive FEMA AE and VE zones; barrier islands among Florida's highest flood risk",
      uniqueRisks: "Peninsula surge trap, barrier island total loss exposure, limited evacuation route constraints",
    },
    nearbyAreas: [
      { name: "Tampa", slug: "tampa" },
      { name: "Clearwater", slug: "clearwater" },
      { name: "Sarasota", slug: "sarasota" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Clearwater",
    slug: "clearwater",
    county: "Pinellas County",
    region: "Gulf Coast",
    description: [
      "Clearwater is the county seat of Pinellas County and home to Clearwater Beach, one of Florida's most visited and most hurricane-exposed coastlines. The barrier island of Clearwater Beach faces direct Gulf of Mexico exposure, and the combination of its low elevation, high visitor density, and significant permanent residential population makes it one of the most complex storm damage environments in the state.",
      "Clearwater Beach's hotel, resort, and condominium properties represent enormous insurance exposures. When a major hurricane damages a beachfront resort or condo tower, the claim involves not just structural damage but also loss of rental income, business interruption, damage to furnishings and fixtures, and potentially complex multi-insurer coordination. Our team handles high-value commercial and residential claims on Clearwater Beach with the thoroughness these exposures demand.",
      "The mainland Clearwater residential neighborhoods feature a mix of 1960s to 1990s CBS homes with aging roofs and plumbing systems. Many homeowners in these neighborhoods have been with the same insurance company for decades and have never filed a significant claim — which means they have no experience navigating a disputed loss. Insurance companies recognize this and use the unfamiliarity to push through underpaid settlements.",
      "Clearwater's medical and commercial corridor along US-19 and Druid Road generates business property and business interruption claims. Water damage from roof failures following storms — a persistent issue in flat-roof commercial buildings — requires timely and thorough documentation to prevent insurers from attributing damage to deferred maintenance.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~120,000",
      commonPropertyTypes: "Barrier island resorts and condos, mainland CBS homes (1960s–1990s), commercial strip",
      stormHistory: "Multiple Gulf hurricane impacts; proximity to St. Pete Beach (Helene 2024 surge); Irma (2017)",
      floodZone: "Clearwater Beach extensively in FEMA VE/AE zones; mainland mixed flood zones",
      uniqueRisks: "Barrier island total loss exposure, hotel/resort BI claims, aging mainland residential stock",
    },
    nearbyAreas: [
      { name: "Tampa", slug: "tampa" },
      { name: "St. Petersburg", slug: "st-petersburg" },
      { name: "Sarasota", slug: "sarasota" },
    ],
    featuredCaseType: "Commercial Loss",
  },
  {
    city: "Sarasota",
    slug: "sarasota",
    county: "Sarasota County",
    region: "Gulf Coast",
    description: [
      "Sarasota is one of Florida's most culturally rich Gulf Coast communities, known for its arts scene, beautiful barrier island beaches, and affluent residential communities. Hurricane Ian (2022) devastated the broader Sarasota region, generating billions in insured losses and bringing the reality of Gulf hurricane risk home to a community that had not experienced a direct major hit in decades.",
      "Sarasota's barrier islands — Siesta Key, Longboat Key, Lido Key, and Casey Key — represent some of the Gulf Coast's most exposed properties. These narrow barriers face direct Gulf hurricane wind and storm surge, and many of the homes and resorts here experienced catastrophic damage during Ian. For beachfront property owners, the intersection of wind damage (homeowner policy) and surge damage (flood policy) requires precise documentation to avoid gaps in coverage.",
      "The mainland Sarasota residential market spans historic neighborhoods near downtown like Laurel Park and McClellan Park — with 1920s bungalows and Mediterranean Revival homes — to modern luxury communities like Lakewood Ranch to the east. The range of construction types and property values means claims complexity varies widely, and high-value claims here often attract experienced insurer adjusters who minimize payouts.",
      "Sarasota's vibrant downtown and arts district generate commercial property claims, particularly from the restaurant and hospitality sector that relies on intact physical spaces to operate. Business interruption documentation for Sarasota's creative economy businesses requires understanding of seasonal revenue patterns and the impact of extended closures on annual income.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~58,000 city / ~450,000 county",
      commonPropertyTypes: "Barrier island estates and condos, historic downtown homes, luxury mainland communities",
      stormHistory: "Hurricane Ian (2022) — regional catastrophe; Hurricane Irma (2017) — wind damage throughout",
      floodZone: "Barrier islands extensively in FEMA VE/AE zones; Gulf-front properties highest risk",
      uniqueRisks: "Ian aftermath claims still in dispute, barrier island surge exposure, high-value property complexity",
    },
    nearbyAreas: [
      { name: "Tampa", slug: "tampa" },
      { name: "Fort Myers", slug: "fort-myers" },
      { name: "Clearwater", slug: "clearwater" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Fort Myers",
    slug: "fort-myers",
    county: "Lee County",
    region: "Gulf Coast",
    description: [
      "Fort Myers was ground zero for Hurricane Ian's landfall on September 28, 2022, as a Category 4 storm with winds near 150 mph and storm surge exceeding 15 feet in some areas. The destruction was historic — tens of thousands of homes and businesses were damaged or destroyed, and the claims process that followed has been one of the most contentious in Florida insurance history. Many Fort Myers property owners are still fighting with their insurance companies years later.",
      "The pattern of denied and underpaid Ian claims in Fort Myers is well-documented. Insurers deployed thousands of their own adjusters to the region with explicit pressure to minimize payouts. Policy language around 'concurrent causation' (where insurers argue that flood damage — typically excluded — was the primary cause even when wind damage was also significant) has been weaponized to deny claims that should clearly be covered under standard homeowner policies.",
      "Cape Coral, directly across the Caloosahatchee River from Fort Myers, experienced similar devastation and similar claims challenges. As a public adjuster firm that operates statewide, we can represent Fort Myers and Cape Coral property owners in their ongoing disputes with insurers who have already had years to build their case against paying.",
      "Beyond Ian, Fort Myers continues to face hurricane season risk each year. The Lee County coast is a historically active landfall zone, and property owners here need a public adjuster they can rely on not just for post-Ian claims but for future storm events as well. Claim Remedy Adjusters provides free claim reviews for any Fort Myers property owner who believes their Ian settlement was inadequate.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Denied Claim", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~90,000",
      commonPropertyTypes: "CBS residential, waterfront canal homes, barrier island condos, commercial",
      stormHistory: "Hurricane Ian (2022) — Category 4 direct landfall, catastrophic; most destructive storm in Lee County history",
      floodZone: "Extensive FEMA AE and VE zones; entire coastal and canal system at surge risk",
      uniqueRisks: "Ian-related underpaid/denied claims, concurrent causation disputes, ongoing litigation environment",
    },
    nearbyAreas: [
      { name: "Naples", slug: "naples" },
      { name: "Sarasota", slug: "sarasota" },
    ],
    featuredCaseType: "Denied Claim",
  },
  {
    city: "Naples",
    slug: "naples",
    county: "Collier County",
    region: "Gulf Coast",
    description: [
      "Naples is one of Florida's wealthiest communities, with per-capita income among the highest in the state and a property market that includes some of the most expensive real estate in the Southeast. Hurricane Irma (2017) struck Naples with devastating force — the storm's eye passed directly over Collier County, leaving behind widespread roof damage, flooding, and destruction to the carefully maintained luxury properties that define the area.",
      "The high property values in Naples mean that even modest percentage underpayments on insurance claims represent large absolute dollar amounts. When a $3 million home sustains storm damage and the insurance company's estimate comes in $400,000 below what contractors actually quote, that $400,000 gap is worth fighting for — and fighting for it requires a public adjuster with the expertise and credibility to take on an insurer's experienced commercial adjustment team.",
      "Marco Island and the other barrier islands south of Naples face extreme Gulf hurricane exposure. Marco Island properties have experienced surge and wind damage from multiple storms, and the combination of Gulf-front exposure and high property values makes these some of the most valuable — and most contested — insurance claims in Southwest Florida.",
      "The commercial district along Fifth Avenue South and Third Street South represents Naples' luxury retail and restaurant economy. Business interruption claims for these high-revenue establishments — which depend on seasonal tourist traffic — require careful documentation of pre-loss revenue, seasonal patterns, and extended recovery periods to fully capture the economic impact of storm damage.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~23,000 city / ~385,000 county",
      commonPropertyTypes: "Luxury estates, Gulf-front condos and single-family, high-end commercial, Marco Island barrier island",
      stormHistory: "Hurricane Irma (2017) — direct eye passage, catastrophic; Hurricane Ian (2022) — regional impact",
      floodZone: "Extensive FEMA AE and VE zones along Gulf coast; interior portions in X zones",
      uniqueRisks: "High-value property complexity, luxury material replacement cost, Irma claims still in dispute",
    },
    nearbyAreas: [
      { name: "Fort Myers", slug: "fort-myers" },
      { name: "Sarasota", slug: "sarasota" },
    ],
    featuredCaseType: "Commercial Loss",
  },

  // ─── Central Florida ─────────────────────────────────────────────────────
  {
    city: "Orlando",
    slug: "orlando",
    county: "Orange County",
    region: "Central Florida",
    description: [
      "Orlando is Florida's most visited city and one of its largest metro areas, with a property base that encompasses everything from theme park resort hotels to sprawling suburban residential communities to inner-city neighborhoods with aging housing stock. The diversity of property types generates a correspondingly diverse range of insurance claims — from single-family residential water damage to multi-million-dollar commercial property losses at resort properties.",
      "Central Florida may not have the direct hurricane coastline exposure of Miami or Tampa, but it is far from immune to storm damage. Tropical storms and the inland-tracking remnants of Gulf and Atlantic hurricanes regularly bring damaging winds to the Orlando area. Hurricane Charley (2004) cut directly through Central Florida causing significant wind damage, and Hurricane Ian (2022) produced damaging winds and tornadoes across the region as it crossed the state.",
      "The Orlando metro's massive hospitality and tourism sector generates unique commercial property claims. Hotels, resorts, convention centers, and entertainment venues face not just physical damage from storms but also complex business interruption scenarios — hotels lose room revenue; restaurants lose covers; entertainment venues lose ticket sales. Properly documenting these losses requires expertise in hospitality-sector financial analysis.",
      "Residential Orlando — particularly the older neighborhoods of College Park, Winter Park, and Dr. Phillips — features homes built in the 1960s through 1990s with the typical aging-infrastructure claims profile. Roofs approaching end-of-life, original plumbing systems, and mature tree canopy create a familiar pattern of claims that insurance companies are well prepared to dispute. Our statewide coverage means Orlando homeowners have access to the same expert representation as our South Florida clients.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~320,000 city / ~3M metro",
      commonPropertyTypes: "Suburban CBS (1960s–2000s), tourism/hospitality commercial, downtown residential",
      stormHistory: "Hurricane Charley (2004) direct path; Hurricane Ian (2022) wind and tornado damage",
      floodZone: "Interior lakes and Boggy Creek corridor in FEMA AE zones; mostly X zone",
      uniqueRisks: "Hospitality sector BI complexity, tornado risk, aging suburban residential, interior tree damage",
    },
    nearbyAreas: [
      { name: "Tampa", slug: "tampa" },
      { name: "Daytona Beach", slug: "daytona-beach" },
      { name: "Gainesville", slug: "gainesville" },
    ],
    featuredCaseType: "Commercial Loss",
  },

  // ─── North Florida ────────────────────────────────────────────────────────
  {
    city: "Jacksonville",
    slug: "jacksonville",
    county: "Duval County",
    region: "North Florida",
    description: [
      "Jacksonville is the largest city by land area in the contiguous United States, a sprawling Northeast Florida metro that stretches from the Atlantic Ocean beaches to the inland St. Johns River basin. The city's geographic diversity means it experiences multiple flood-risk pathways: Atlantic coastal surge, St. Johns River flooding during storm events, and storm water flooding from the intense rainfall that tropical systems bring to the region.",
      "Hurricanes Matthew (2016) and Irma (2017) both caused significant flooding in Jacksonville — Matthew in particular sent St. Johns River flooding into downtown and into residential neighborhoods that had not experienced riverine flooding in generations. The storm surge from Matthew caught many Jacksonville homeowners off guard, flooding properties that were not in recognized flood zones and did not have flood insurance. Our team helps these homeowners maximize recovery under their existing homeowner policies.",
      "Jacksonville's massive geographic footprint encompasses a wide range of housing ages and types — from the historic Riverside and Avondale bungalows from the 1920s, to post-war CBS construction in Arlington and Mandarin, to modern subdivisions in Nocatee and the Beaches communities. This diversity means claim types vary significantly by neighborhood, and having a public adjuster who understands the specific construction and exposure characteristics of each area is valuable.",
      "Jacksonville's large commercial and industrial base — the Port of Jacksonville, a major financial services sector, and extensive retail — generates substantial commercial property claims. Our statewide team handles commercial claims in Jacksonville with the same expertise we bring to South Florida's commercial market.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Mold Damage", slug: "water-damage" },
    ],
    localFacts: {
      population: "~975,000",
      commonPropertyTypes: "Historic bungalows, CBS homes across multiple eras, Beaches communities, commercial/industrial",
      stormHistory: "Hurricane Matthew (2016) — St. Johns flooding; Hurricane Irma (2017) — wind and surge",
      floodZone: "St. Johns River corridor in AE zones; Atlantic beaches in VE/AE zones; widespread flood risk",
      uniqueRisks: "Riverine flooding, Atlantic surge, large geographic footprint with varied construction ages",
    },
    nearbyAreas: [
      { name: "Gainesville", slug: "gainesville" },
      { name: "Daytona Beach", slug: "daytona-beach" },
      { name: "Tallahassee", slug: "tallahassee" },
    ],
    featuredCaseType: "Water Claim",
  },
  {
    city: "Tallahassee",
    slug: "tallahassee",
    county: "Leon County",
    region: "North Florida",
    description: [
      "Tallahassee, Florida's state capital, sits in the Florida Panhandle — a region with a climate and hazard profile distinctly different from South Florida. Tallahassee faces elevated risks from tornadoes, severe thunderstorms, and straight-line wind events that are less common in the peninsula. Hurricane Michael (2018) struck the Panhandle as a Category 5 storm with 160 mph winds, one of the most powerful landfalls in United States history, and its track brought catastrophic winds to the Tallahassee area.",
      "The aftermath of Hurricane Michael created a claims environment in the Tallahassee region that was overwhelming for both homeowners and the insurance industry. The sheer scale of damage — destroyed roofs, uprooted trees through houses, widespread structural failures — meant that many claims were processed hastily and incompletely. Years after the storm, many policyholders who accepted initial settlements have discovered that additional damage was overlooked or that repairs were not fully compensated.",
      "Tallahassee's significant tree canopy — the city is known as the 'Canopy Roads' capital of Florida — becomes a major source of property damage claims during storm events. Falling trees cause roof penetrations, structural wall damage, vehicle damage, and crush damage to accessory structures. Insuring the full scope of tree-related damage requires careful documentation of what fell, where it fell, and what it damaged.",
      "As Florida's government and university city, Tallahassee has a substantial residential and commercial property base. Florida State University, Florida A&M University, and the state government complex generate significant commercial and institutional property claims. Our statewide representation means Tallahassee property owners can access the same experienced public adjusting that South Florida policyholders rely on.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
    ],
    localFacts: {
      population: "~200,000",
      commonPropertyTypes: "University-area rentals, state government district, suburban CBS residential, historic areas",
      stormHistory: "Hurricane Michael (2018) — Category 5 Panhandle landfall, catastrophic wind damage",
      floodZone: "Mostly FEMA X; some AE zones along Ochlockonee River and Lake Lafayette",
      uniqueRisks: "Falling tree canopy damage, tornado and severe thunderstorm risk, Hurricane Michael underpaid claims",
    },
    nearbyAreas: [
      { name: "Gainesville", slug: "gainesville" },
      { name: "Jacksonville", slug: "jacksonville" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Gainesville",
    slug: "gainesville",
    county: "Alachua County",
    region: "North Florida",
    description: [
      "Gainesville is home to the University of Florida, one of the nation's largest public universities, and has an economy and property market shaped significantly by the institution. The city's housing stock ranges from vintage student rentals in neighborhoods adjacent to UF's campus — many of which have deferred maintenance — to newer family communities in northwest and southwest Gainesville.",
      "North-central Florida has a thunderstorm frequency among the highest in the United States — the 'Lightning Capital of the US' designation is well earned. Lightning strikes cause roof fires, electrical system damage, and HVAC failures throughout the Gainesville area. Direct lightning strikes to homes can trigger fire claims that appear initially minor but involve significant hidden structural damage. Insurance companies frequently underestimate lightning-related losses, particularly when the evidence is not visible on the surface.",
      "Gainesville's position in North-central Florida means it receives tropical weather impacts from both Gulf and Atlantic systems. While the city rarely takes a direct hurricane hit, tropical storm wind damage is frequent — particularly wind damage to older residential structures near UF's campus that have aging roofs and fewer impact protections than modern construction.",
      "Rental properties in Gainesville face unique insurance considerations, as landlord policies and tenant policies interact in complex ways when damage occurs. Property owners with student rentals frequently discover that their policies have coverage gaps when damage occurs. We help Gainesville property owners — both individual homeowners and investment property landlords — navigate these complexities.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
    ],
    localFacts: {
      population: "~140,000",
      commonPropertyTypes: "University rental housing, suburban CBS residential, commercial along Archer Road corridor",
      stormHistory: "Multiple tropical storm wind events; Hurricane Michael (2018) outer bands; frequent severe thunderstorms",
      floodZone: "Portions near Paynes Prairie and Hogtown Creek in AE zones; mostly X zone",
      uniqueRisks: "Lightning-related fire and electrical claims, aging university-area rental stock, tornado risk",
    },
    nearbyAreas: [
      { name: "Ocala", slug: "ocala" },
      { name: "Jacksonville", slug: "jacksonville" },
      { name: "Tallahassee", slug: "tallahassee" },
    ],
    featuredCaseType: "Roof Claim",
  },
  {
    city: "Daytona Beach",
    slug: "daytona-beach",
    county: "Volusia County",
    region: "North Florida",
    description: [
      "Daytona Beach sits on a barrier island along Florida's Central Atlantic Coast, an internationally known destination for motorsports, spring break, and Bike Week — and a city with significant hurricane and flood exposure. The barrier island's narrow profile means storm surge and wind work together during major hurricane events to create compound damage scenarios.",
      "The property mix in Daytona Beach spans from historic beachside hotels and motels with aging infrastructure to mid-century residential neighborhoods inland to newer condominium towers along the beachfront. Older beachfront commercial properties often have deferred maintenance issues that insurers attempt to conflate with storm damage — distinguishing age-related deterioration from storm-caused damage requires expert documentation.",
      "Volusia County has experienced significant Atlantic hurricane exposure over recent decades, with multiple storms tracking along the coast or making landfall in the region. The 2004 season saw Hurricanes Charley, Frances, and Jeanne all affect the Daytona area within weeks of each other — an extraordinary series of events that stressed both the building stock and the insurance claim handling system.",
      "The race week and bike week events generate significant hotel and commercial revenue that is susceptible to business interruption when storm damage closes properties. Properly documenting the seasonal revenue patterns and the specific economic impact of storm closures requires experienced business income analysis that our team provides.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Commercial Property", slug: "storm-hurricane" },
    ],
    localFacts: {
      population: "~70,000",
      commonPropertyTypes: "Barrier island hotels and condos, inland CBS residential, beachside commercial",
      stormHistory: "2004 season — multiple storms (Charley, Frances, Jeanne); frequent Atlantic hurricane impacts",
      floodZone: "Barrier island extensively in VE/AE zones; inland areas mostly X zone",
      uniqueRisks: "Barrier island surge, aging hotel/commercial stock, seasonal business interruption complexity",
    },
    nearbyAreas: [
      { name: "Jacksonville", slug: "jacksonville" },
      { name: "Orlando", slug: "orlando" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
  {
    city: "Ocala",
    slug: "ocala",
    county: "Marion County",
    region: "North Florida",
    description: [
      "Ocala sits in the heart of Florida's horse country, a region characterized by rolling hills, equestrian estates, and a property market that includes everything from modest mobile homes to multi-million-dollar horse farms with specialized barns, training facilities, and commercial equestrian infrastructure. The range of property types creates a uniquely diverse insurance claims environment.",
      "Marion County is located in Florida's 'sinkhole alley' — a region where the underlying limestone geology makes sinkhole formation significantly more common than in other parts of the state. Sinkhole damage claims are among the most complex in Florida insurance law, involving specialized engineering reports, coverage disputes between standard homeowner policies and separate sinkhole coverage, and often contentious legal proceedings. Our team handles sinkhole claims with the expert documentation these cases require.",
      "The Ocala area faces thunderstorm, lightning, and tornado risks common to North-central Florida. While direct hurricane impacts are less frequent at this inland location, tropical storm wind events and the outer bands of major hurricanes regularly bring damaging winds to Marion County. Mobile home communities, which have significant presence in rural Marion County, are particularly vulnerable to wind events and generate substantial claims.",
      "Agricultural properties in the Ocala area — horse farms, cattle operations, and specialty crop producers — generate unique commercial property claims that require understanding of agricultural asset valuation. Damaged barns, destroyed fencing, equipment losses, and livestock facilities all require specialized appraisal expertise that most public adjusters don't provide. We handle these claims with the same professionalism as our residential and standard commercial cases.",
    ],
    commonDamageTypes: [
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Fire & Smoke", slug: "fire-smoke" },
    ],
    localFacts: {
      population: "~70,000",
      commonPropertyTypes: "Horse farms and equestrian estates, suburban CBS, rural mobile homes, commercial strip",
      stormHistory: "Indirect tropical storm impacts; severe thunderstorm and tornado risk; sinkhole throughout county",
      floodZone: "Mostly FEMA X; some AE zones near Ocklawaha and Silver rivers",
      uniqueRisks: "Sinkhole claims (Marion County is in sinkhole alley), equestrian property complexity, tornado exposure",
    },
    nearbyAreas: [
      { name: "Gainesville", slug: "gainesville" },
      { name: "Orlando", slug: "orlando" },
      { name: "Tampa", slug: "tampa" },
    ],
    featuredCaseType: "Roof Claim",
  },

  // ─── Florida Keys ────────────────────────────────────────────────────────
  {
    city: "Key West",
    slug: "key-west",
    county: "Monroe County",
    region: "Florida Keys",
    description: [
      "Key West occupies the southernmost point of the continental United States, a position that gives it both its iconic character and its extreme vulnerability to Atlantic and Gulf hurricanes. The island sits at the convergence of the Atlantic Ocean, Gulf of Mexico, and Florida Straits — with hurricane exposure from multiple directions and essentially no landmass to reduce storm intensity before it arrives. This is the most hurricane-exposed real estate in Florida, and insurance claims here are correspondingly complex.",
      "Hurricane Irma (2017) made landfall in the Florida Keys as a Category 4 storm with 130 mph winds, and its path directly over the island chain was catastrophic. Key West sustained severe wind damage and storm surge, with the historic downtown and residential neighborhoods losing roofs, experiencing flooding, and sustaining structural damage to buildings that date back 100 to 150 years. The post-Irma claims environment in Key West has been contentious — insurers have used historic property age arguments to minimize payouts on buildings whose replacement costs are extremely high.",
      "The housing stock in Key West is predominantly historic wood-frame construction from the late 1800s and early 1900s. These 'conch houses' have charm and historical significance, but they are built from native pine and cypress that requires specialized restoration — not standard lumber replacement. When an insurer tries to pay for your 1890 conch house roof using standard lumber prices, you are losing money. Our team documents historic property replacement costs with precision.",
      "Key West is also a major commercial tourism destination, and the damage to its hospitality sector from Hurricane Irma resulted in enormous business interruption losses for hotels, restaurants, and tour operators. Properly documenting and recovering those losses requires expertise in both physical damage assessment and business income analysis. Flood insurance is mandatory for virtually all Key West properties — coordinating flood, wind, and business interruption claims requires the comprehensive approach that Claim Remedy Adjusters provides.",
    ],
    commonDamageTypes: [
      { label: "Hurricane & Wind", slug: "storm-hurricane" },
      { label: "Water Damage", slug: "water-damage" },
      { label: "Roof Claims", slug: "roof-claims" },
      { label: "Appraisal", slug: "appraisal" },
    ],
    localFacts: {
      population: "~26,000",
      commonPropertyTypes: "Historic wood-frame conch houses (1880s–1920s), Keys-style homes, tourism/commercial",
      stormHistory: "Hurricane Irma (2017) — Category 4 direct landfall, catastrophic; multiple historic hurricanes",
      floodZone: "Virtually entire island in FEMA AE and VE zones; flood insurance mandatory",
      uniqueRisks: "Historic wood construction (specialized replacement cost), multi-directional hurricane exposure, surge from both Atlantic and Gulf",
    },
    nearbyAreas: [
      { name: "Homestead", slug: "homestead" },
      { name: "Miami", slug: "miami" },
    ],
    featuredCaseType: "Hurricane Claim",
  },
];

// ── Lookup helpers ────────────────────────────────────────────────────────────
export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export const allSlugs = cities.map((c) => c.slug);

export const regionOrder: Region[] = [
  "South Florida — Miami-Dade",
  "South Florida — Broward",
  "South Florida — Palm Beach",
  "Gulf Coast",
  "Central Florida",
  "North Florida",
  "Florida Keys",
];

export function citiesByRegion(): Map<Region, CityData[]> {
  const map = new Map<Region, CityData[]>();
  for (const region of regionOrder) {
    map.set(region, cities.filter((c) => c.region === region));
  }
  return map;
}

// Slug-to-city name map used by ServiceAreaMap and other components
export const citySlugMap: Record<string, string> = Object.fromEntries(
  cities.map((c) => [c.city, c.slug])
);
