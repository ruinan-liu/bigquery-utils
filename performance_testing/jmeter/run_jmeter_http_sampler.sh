#!/usr/bin/env bash

# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License

#########################################################################
# Make sure you run the following gcloud auth command
# if you're not using a service account to authenticate:
#
# gcloud auth login
#
# If you are using a service account, run the following gcloud auth command
# after specifying the path to your service account private key.
#
# gcloud auth activate-service-account --key-file=/path/to/your/private_key.json
#
#########################################################################

apache-jmeter-5.3/bin/jmeter -n \
-t bigquery_http_sampler.jmx \
-Jproject_id=YOUR_PROJECT \
-Jtoken=$(gcloud auth print-access-token) \
-Jsimple_csv_path=test_queries/simple_selects.csv \
-Jmedium_csv_path=test_queries/medium_selects.csv \
-Jcomplex_csv_path=test_queries/complex_selects.csv \
-Jerror_csv_path=errors.csv \
-Jsimple_num_users=6 \
-Jmedium_num_users=3 \
-Jcomplex_num_users=1 \
-Jnum_loops=-1 \
-Jrun_id=jmeter_test_label \
-Jthread_duration=10 \
-Jramp_time=0;