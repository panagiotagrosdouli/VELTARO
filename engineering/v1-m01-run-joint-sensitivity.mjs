// Reproducible research-only runner; prints illustrative arithmetic, never V1 claims.
import {readFileSync} from 'node:fs';
import {jointSensitivity} from './v1-m01-joint-sensitivity.mjs';

const sample = JSON.parse(readFileSync('engineering/v1-m01-energy-sample.json', 'utf8'));
const sources = JSON.parse(readFileSync('engineering/v1-m01-public-source-register.json', 'utf8'));
if (sources.status !== 'BACKGROUND_RESEARCH_ONLY' ||
    sources.validated_vehicle_data !== false ||
    sources.decision !== 'HOLD_BOTH')
  throw Error('Background research cannot be re-labelled as VELTARO validation');

const report = jointSensitivity(sample);
report.sourceRegister = 'engineering/v1-m01-public-source-register.json';
report.knownEvidenceGaps = sources.open_numeric_evidence.map(x => x.id);
process.stdout.write(JSON.stringify(report, null, 2) + '\n');
