# Feasibility and release gate

Reviewed 2026-09-30. This project targets **American Sign Language (ASL)** only.

## Candidate sources

1. [ASL Citizen](https://www.microsoft.com/en-us/research/project/asl-citizen/) supplies isolated signs and research baselines. Its [dataset license](https://www.microsoft.com/en-us/research/project/asl-citizen/dataset-license/) restricts usage to non-commercial research and prohibits data redistribution. Do not bundle its videos into a public product. Code and model licenses must be checked independently.
2. [WLASL](https://github.com/dxli94/WLASL) is a word-level research dataset under C-UDA terms. Source-video availability and redistribution rights require independent review. Not approved for inclusion.
3. [MediaPipe Gesture Recognizer](https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer) identifies a limited set of gestures and landmarks. Its canned classes are **not an ASL translation model**. A working hand detector alone does not meet the recognition requirement.

## Release gate

Before enabling recognition, require a model manifest with vocabulary, license, provenance, version, preprocessing, temporal inputs, operating limits and evaluation reference. Evaluate with signer-disjoint splits, unknown movements and no-sign inputs. Report sample counts, per-class results, abstention and latency hardware.

Before publishing reply clips, require rights for public distribution, a complete phrase, ASL reviewer and review date. Do not concatenate isolated signs into a claimed grammatical sentence.

## Current limitation

No model or response clip has passed those gates. The application may offer local capture, playback, rejection/correction UX and a clearly labeled interface walkthrough. It must not advertise functioning ASL recognition or invented accuracy. Training, ASL validation and signed-video licensing remain required work.

## Scope

Short isolated signs first; continuous translation, fingerspelling and generated signing are separate research tasks. No clinical, legal or emergency interpreting claims. No automatic video upload or training reuse.
