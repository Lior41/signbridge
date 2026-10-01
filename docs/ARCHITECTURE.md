# Architecture and release gates

## Implemented release

Next.js serves a research landing page, communication studio, privacy page, empty validated-vocabulary library and release checklist. Browser state handles a local video preview and a prewritten confirmation/correction scenario. There is no inference endpoint, no upload storage and no database of conversations.

Camera access is requested only after a user action. Audio is not requested. Media tracks stop on hide/unmount; object URLs are revoked. A generation counter prevents a late camera permission result from reactivating an abandoned capture. All essential information is visual and textual.

Local file preview accepts MP4/WebM, limits file size to 8 MB and checks the loaded duration against 15 seconds. These are browser-side preview constraints, not claims of hardened server upload validation. If uploads are added later, media inspection, size/duration limits, safe decoding, timeouts, consent and retention controls must also exist server-side.

## Future inference contract

The schema distinguishes a versioned ASL vocabulary manifest from inference candidates. A future integration must prove model and media rights, vocabulary review and evaluator provenance before enabling the feature. The current abstention function can reject no-sign input, unknown labels, low scores or an insufficient margin. Its threshold is an uncalibrated scaffold, not measured reliability. Synthetic unit labels establish policy behavior only.

Isolated sign classification does not equal continuous ASL translation. Hand landmarks or a generic gesture classifier are not an ASL interpreter. Facial expression, motion, body position, grammatical structure and context matter. English word order cannot simply be mapped to ASL by concatenating word clips.

## Evaluation before release

Split by signer, not random clips. Keep a frozen held-out set and report per-sign confusion, false acceptances on unrelated motion, absence-of-sign cases, abstention rate and latency with device/model conditions. Include lighting, framing, speed and signer diversity limitations. Do not show accuracy or latency until the exact experiment has run and the underlying set can be audited legally.

## Signed replies

Use complete, authorized phrase videos reviewed by a competent ASL signer or educator. Keep consent, redistribution permission, reviewer identity/qualification and version history. Let the user choose the intended response. Label this as selecting a prerecorded video, not generated translation. No licensed reviewed clips are currently included, so reply playback remains a release blocker.

See [Feasibility](FEASIBILITY.md) for dataset licence considerations. The current product is an interface prototype, not a complete ASL communication system and not an interpreter substitute.
